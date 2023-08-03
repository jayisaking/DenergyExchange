import React, { useState } from 'react';
import { Button, InputField, Dropdown } from "./formComps";
import { supply } from './web3Utils';
const Send = () => {
  const [ targetStorageOperator, setTargetStorageOperator ] = useState('');
  const [ trasmissionElectricitVolume, setTrasmissionElectricitVolume ] = useState('');
  const [ additionalInfo, setAdditionalInfo ] = useState('');
  const [ senderIdentity, setSenderIdentity ] = useState('');
  async function sendElectricity() {
    // TODO: send the data to the blockchain
    await supply(1000);
  }


  return (
    <div className = "border border-yellow-300 shadow-xl p-4 rounded-lg my-8">
      <h2 className="text-xl font-semibold mb-4">Send</h2>
       <Dropdown label = "Identity" options = { ["Storage Operator", "Household Supplier"] } value = { senderIdentity } onChange = { (event) => {} } setValue = { setSenderIdentity }/>
      <InputField label = "Target Storage Operator" type = "text" placeholder = "Address of the Storage Operator" value = { targetStorageOperator } setValue = { setTargetStorageOperator } />
      <InputField label = "Transmission Electricity Volume" type = "number" placeholder = "Volume of the Electricity transmitted in kJ" value = { trasmissionElectricitVolume } setValue = { setTrasmissionElectricitVolume } />
      <InputField label = "Additional Info" type = "text" placeholder = "Additional Info" value = { additionalInfo } setValue = { setAdditionalInfo } />
      <Button onClick = { sendElectricity } text = "Send" className = "w-full mt-4" />
    </div>
  );
};

export default Send;