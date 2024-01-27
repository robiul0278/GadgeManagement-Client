import { Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
};

const LoginInput = ({ type, name, label,placeholder }: TInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} placeholder={placeholder} type={type} id={name} />}
      />
    </div>
  );
};

export default LoginInput;