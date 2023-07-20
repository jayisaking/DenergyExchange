import React, { useState } from 'react';
import { Button, InputField } from "./formComps";
const Burn = () => {
  const [ burnQuantity, setBurnQuantity ] = useState(''); 
  const [ additionalInfo, setAdditionalInfo ] = useState('');
  const [ sourceSupplier, setSourceSupplier ] = useState(''); 
  function burnTokenForElectriciy() {
    // TODO: send the data to the blockchain
  }


  return (
    <div className = "border border-yellow-300 shadow-xl p-4 rounded-lg my-8">
      <h2 className="text-xl font-semibold mb-4">Burn</h2>
      <InputField label = "Burn Token Quantity" type = "number" placeholder = "Quantity of the Token to Burn" value = { burnQuantity } setValue = { setBurnQuantity } />
      <InputField label = "Additional Info" type = "text" placeholder = "Additional Info" value = { additionalInfo } setValue = { setAdditionalInfo } />
      <Button onClick = { burnTokenForElectriciy } text = "Burn" className = "w-full mt-4" />
    </div>
  );
};

export default Burn;