import React, { useState } from 'react';
import { Button, InputField } from "./formComps";
const Confirm = () => {
  const [ targetStorageOperator, setTargetStorageOperator ] = useState('');
  const [ trasmissionElectricitVolume, setTrasmissionElectricitVolume ] = useState('');
  const [ additionalInfo, setAdditionalInfo ] = useState('');
  const [ sourceSupplier, setSourceSupplier ] = useState(''); 
  function confirmTransmissionFromSource() {
    // TODO: send the data to the blockchain
  }


  return (
    <div className = "border border-yellow-300 shadow-xl p-4 rounded-lg my-8">
      <h2 className="text-xl font-semibold mb-4">Confirm</h2>
       
      <InputField label = "Source Supplier" type = "text" placeholder = "Address of the Source Supplier" value = { sourceSupplier } setValue = { setSourceSupplier } />
      <InputField label = "Transmission Electricity Volume" type = "number" placeholder = "Volume of the Electricity transmitted in kJ" value = { trasmissionElectricitVolume } setValue = { setTrasmissionElectricitVolume } />
      <InputField label = "Additional Info" type = "text" placeholder = "Additional Info" value = { additionalInfo } setValue = { setAdditionalInfo } />
      <Button onClick = { confirmTransmissionFromSource } text = "Confirm" className = "w-full mt-4" />
    </div>
  );
};

export default Confirm;