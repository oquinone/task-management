import { Input } from "antd";

const InputAntd = (props: any) => {
  const {
    placeholder = "",
    value = "",
    onChange = null,
    allowClear = false,
    className = "",
  } = props || {};

  const inputProps = {
    placeholder,
    value,
    onChange,
    allowClear,
    className,
  };

  return <Input {...inputProps} />;
};

export default InputAntd;
