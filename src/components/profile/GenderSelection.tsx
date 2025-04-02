
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface GenderSelectionProps {
  selectedGender: string;
  onGenderChange?: (gender: string) => void;  // Made optional
}

const GenderSelection = ({ selectedGender, onGenderChange = () => {} }: GenderSelectionProps) => {
  const [gender, setGender] = useState(selectedGender);

  const handleChange = (value: string) => {
    setGender(value);
    onGenderChange(value);
  };

  return (
    <RadioGroup
      defaultValue={gender}
      className="flex flex-col md:flex-row gap-4"
      onValueChange={handleChange}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="male" id="male" className="text-primary-purple" />
        <Label htmlFor="male" className="text-white">Male</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="female" id="female" className="text-primary-purple" />
        <Label htmlFor="female" className="text-white">Female</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="other" id="other" className="text-primary-purple" />
        <Label htmlFor="other" className="text-white">Other</Label>
      </div>
    </RadioGroup>
  );
};

export default GenderSelection;
