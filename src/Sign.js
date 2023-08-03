import React, { useState } from 'react';
import { Button, InputField } from "./formComps";
import { supply } from './web3Utils';
const Sign = () => {
  const [ targetElectricityReceiver, setTargetElectricityReceiver ] = useState('');
  const [ trasmissionElectricitVolume, setTrasmissionElectricitVolume ] = useState('');
  const [ additionalInfo, setAdditionalInfo ] = useState('');
  const [ sourceSupplier, setSourceSupplier ] = useState(''); 
  async function SignTrasmittedElectricity() {
    // TODO: Sign the data to the blockchain
    supply(1000);
  }


  return (
    <div className = "border border-yellow-300 shadow-xl p-4 rounded-lg my-8">
      <h2 className="text-xl font-semibold mb-4">Sign</h2>
      <InputField label = "Source Supplier" type = "text" placeholder = "Address of the Source Supplier" value = { sourceSupplier } setValue = { setSourceSupplier } />
      <InputField label = "Target Electricity Receiver" type = "text" placeholder = "Address of the Electricity Receiver" value = { targetElectricityReceiver } setValue = { setTargetElectricityReceiver } />
      <InputField label = "Transmission Electricity Volume" type = "number" placeholder = "Volume of the Electricity transmitted in kJ" value = { trasmissionElectricitVolume } setValue = { setTrasmissionElectricitVolume } />
      <InputField label = "Additional Info" type = "text" placeholder = "Additional Info" value = { additionalInfo } setValue = { setAdditionalInfo } />
      <Button onClick = { SignTrasmittedElectricity } text = "Sign" className = "w-full mt-4" />
    </div>
  );
};

export default Sign;