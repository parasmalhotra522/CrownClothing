import { FormInputLabel, Input, Group } from './form-input.styles';
import { useSelector } from 'react-redux';

const FormInput = ({ label, ...otherProps }) => {
  const darkModeReducer = useSelector((state)=>state.darkModeReducer)
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          color={darkModeReducer.textColor}
          shrink={otherProps.value.length}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
