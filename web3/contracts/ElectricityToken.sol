// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ElectricityToken is ERC20 {
    constructor() ERC20("ElectricityToken", "ELEC") {
        _mint(msg.sender, 1000000000000000000000000);
        admins[msg.sender] = true;
    }
    function addAdmin(address admin) external {
        require(admins[msg.sender], "Only admin can add admin");
        admins[admin] = true;
    }
    function addAllowedCollecteralToken(address collecteralToken, uint256 collecteralAmount, uint256 electricityRate) external {
        require(admins[msg.sender], "Only admin can add allowed collecteral token");
        require(!allowedCollecteralTokens[collecteralToken], "Collecteral token is already allowed");
        allowedCollecteralTokens[collecteralToken] = true;
        collecteralTokenAmounts[collecteralToken] = collecteralAmount;
        collecteralTokenToElectricityRate[collecteralToken] = electricityRate;
        emit CollecteralTokenAdded(collecteralToken, collecteralAmount, electricityRate);
    }
    function registerExaminer(address token) external payable{
        require(allowedCollecteralTokens[token], "Collecteral token is not allowed");
        ERC20(token).transferFrom(msg.sender, address(this), collecteralTokenAmounts[token]);
        examiners[msg.sender] = true;
        totalExaminerNumber += 1;
    }
    struct Supply {
        uint256 amount;
        address supplier;
        address receiver;
        mapping (address => bool) approvedExaminers;
        uint256 approvedExaminerNumber;
        bool isTerminated;
    }
    struct Request {
        uint256 amount;
        address supplier;
        address receiver;
        mapping (address => bool) approvedExaminers;
        uint256 approvedExaminerNumber;
        bool isTerminated;
    }
    event CollecteralTokenAdded(address collecteralToken, uint256 collecteralAmount, uint256 electricityRate);
    event SupplyElectricity(uint256 amount, address supplier);
    event RequestElectricity(uint256 amount, address receiver);
    uint256 totalExaminerNumber = 0;
    uint256 currentIndex = 0; 
    mapping (uint256 => Supply) supplies;
    mapping (uint256 => Request) requests;
    mapping (address => bool) allowedCollecteralTokens;
    mapping (address => bool) examiners;
    mapping (address => uint256) collecteralTokenAmounts;
    mapping (address => uint256) collecteralTokenToElectricityRate;
    mapping (address => bool) admins;
    mapping (address => mapping(address => uint256)) balances;
    function supply(uint256 amount) external {
        currentIndex += 1;
        supplies[currentIndex].amount = amount;
        supplies[currentIndex].supplier = msg.sender;
        emit SupplyElectricity(amount, msg.sender);
    }
    function request(uint256 amount) external payable {
        currentIndex += 1;
        requests[currentIndex].amount = amount;
        requests[currentIndex].receiver = msg.sender;
        _transfer(msg.sender, address(this), amount);
        emit RequestElectricity(amount, msg.sender);
    }
    function storageSupplyConfirm(uint256 amount, address receiver, uint256 requestIndex) external {
        require(requests[requestIndex].amount == amount, "Amount is not correct");
        require(requests[requestIndex].receiver == receiver, "Receiver is not correct");
        requests[requestIndex].supplier = msg.sender;
    }
    function storageReceiveConfirm(uint256 amount, address supplier, uint256 supplyIndex, address collecteralToken) external payable{
        require(supplies[supplyIndex].amount == amount, "Amount is not correct");
        require(supplies[supplyIndex].supplier == supplier, "Supplier is not correct");
        require(allowedCollecteralTokens[collecteralToken], "Collecteral token is not allowed");
        supplies[supplyIndex].receiver = msg.sender;
        ERC20(collecteralToken).transferFrom(msg.sender, address(this), amount * collecteralTokenToElectricityRate[collecteralToken]);
        balances[msg.sender][collecteralToken] += amount * collecteralTokenToElectricityRate[collecteralToken];
    }
    modifier onlyTransmissionExist (address supplier, address receiver, uint256 amount, uint256 supplyIndex ) {
        require(supplier != address(0), "Supplier is not correct");
        require(receiver != address(0), "Receiver is not correct");
        require(examiners[msg.sender], "Only examiner can approve transmission");
        require(supplies[supplyIndex].amount == amount, "Amount is not correct");
        require(supplies[supplyIndex].supplier == supplier, "Supplier is not correct");
        require(supplies[supplyIndex].receiver == receiver, "Receiver is not correct");
        _;
    }
    function approveSupplyTransmission(address supplier, address receiver, uint256 amount, uint256 supplyIndex) external onlyTransmissionExist(supplier, receiver, amount, supplyIndex) {
        supplies[supplyIndex].approvedExaminers[msg.sender] = true;
        supplies[supplyIndex].approvedExaminerNumber += 1;
        if (supplies[supplyIndex].approvedExaminerNumber >= totalExaminerNumber / 2) {
            _mint(supplier, amount - amount / 100);
        }
        supplies[supplyIndex].isTerminated = true;
    }
    function approveRequestTransmission(address supplier, address receiver, uint256 amount, uint256 requestIndex) external onlyTransmissionExist(supplier, receiver, amount, requestIndex) {
        requests[requestIndex].approvedExaminers[msg.sender] = true;
        requests[requestIndex].approvedExaminerNumber += 1;
        if (requests[requestIndex].approvedExaminerNumber >= totalExaminerNumber / 2) {
           _burn(address(this), amount);
        }
        requests[requestIndex].isTerminated = true;
    }
    function withdrawSupplyConfirmationReward(uint256 supplyIndex) external {
        require(supplies[supplyIndex].approvedExaminers[msg.sender], "Only approved examiner can withdraw reward");
        require(supplies[supplyIndex].isTerminated, "Supply is terminated");
        _mint(msg.sender, supplies[supplyIndex].amount / 100 / supplies[supplyIndex].approvedExaminerNumber);
    }
    function withdrawRequestConfirmationReward(uint256 requestIndex) external {
        require(requests[requestIndex].approvedExaminers[msg.sender], "Only approved examiner can withdraw reward");
        require(requests[requestIndex].isTerminated, "Request is terminated");
        _mint(msg.sender, requests[requestIndex].amount / 100 / requests[requestIndex].approvedExaminerNumber);
    }
    function withdrawStorageCollecteral(address collecteralToken, uint256 requestIndex) external {
        require(requests[requestIndex].supplier == msg.sender, "Only supplier can withdraw collecteral");
        require(requests[requestIndex].isTerminated, "Request is not terminated");
        require(balances[msg.sender][collecteralToken] >  requests[requestIndex].amount * collecteralTokenToElectricityRate[collecteralToken], "Not enough collecteral");
        ERC20(collecteralToken).transfer(msg.sender, requests[requestIndex].amount * collecteralTokenToElectricityRate[collecteralToken]);
    }

}