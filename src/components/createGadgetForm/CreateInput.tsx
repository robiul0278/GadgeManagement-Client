import { Input } from 'antd';
import { Controller,} from 'react-hook-form';

type TInputProps = {
type: string ;
  name: string;
  label?: string;
  defaultValue?: string | number;
};

const CreateInput = ({ type, name, label, defaultValue   }: TInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field}  defaultValue={defaultValue} type={type} id={name} />}
      />
    </div>
  );
};

export default CreateInput;