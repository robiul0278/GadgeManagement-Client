import { Input } from 'antd';
import { Controller,} from 'react-hook-form';

type TInputProps = {
type: string ;
  name: string;
  label?: string;
  defaultValue?: string | number;
  placeholder?: string ;
};

const CreateInput = ({ type, name, label, defaultValue, placeholder   }: TInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} placeholder={placeholder}  defaultValue={defaultValue} type={type} id={name} />}
      />
    </div>
  );
};

export default CreateInput;