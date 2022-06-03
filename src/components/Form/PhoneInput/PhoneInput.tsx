import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useController, UseControllerProps } from 'react-hook-form';
import {
  DefaultInputComponentProps,
  FeatureProps as PhoneInputProps,
  isPossiblePhoneNumber
} from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/input';
import classNames from 'utils/classNames';

export interface FormPhoneInputProps extends PhoneInputProps<DefaultInputComponentProps> {
  id: string;
  label: string;
  helpText?: string;
  // Because the phone # validation gives no way to set a message
  defaultErrorMessage?: string;
}

export const FormPhoneInput = ({
  className,
  id,
  label,
  helpText,
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  inputComponent,
  defaultErrorMessage,
  ...props
}: FormPhoneInputProps & UseControllerProps<any, any>) => {
  rules = {
    ...rules,
    validate: isPossiblePhoneNumber
  };

  const { field, fieldState } = useController({ name, control, defaultValue, rules, shouldUnregister });
  const { error } = fieldState;

  return (
    <div className={`${className} relative`}>
      <div className="flex justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {rules?.required && (
          <span className="text-sm text-gray-400" id={`${id}-required`}>
            Required
          </span>
        )}
      </div>
      <PhoneInput
        {...props}
        {...field}
        id={id}
        type="tel"
        autoComplete="tel"
        className={classNames(
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
          'mt-1 block w-full shadow-sm sm:text-sm rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed'
        )}
      />
      {error && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
      )}
      {helpText && (
        <p className="mt-2 text-sm text-gray-500" id={`${id}-help-text`}>
          {helpText}
        </p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
          {error.message === '' ? defaultErrorMessage : error.message}
        </p>
      )}
    </div>
  );
};

export default FormPhoneInput;