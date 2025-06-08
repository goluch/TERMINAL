import {Field, Label, Switch, SwitchProps} from "@headlessui/react";
import clsx from "clsx";

type LabeledSwitchProps = SwitchProps & {
    label?: string
    onChange: () => void
}

const LabeledSwitch = (
    {label, onChange, checked}: LabeledSwitchProps
) => {
    return (
        <Field>
            <div className="flex items-center gap-3">
            <Label className="text-sm font-normal font-sans text-gray-700">
                {label}:
            </Label>
            <Switch
                checked={checked}
                onChange={onChange}
                className={'toggle rounded-full toggle-success toggle-lg'}
            >
                <span
                    className={clsx('size-4 rounded-full bg-white transition',
                        checked ? 'translate-x-6' : 'translate-x-1')}
                >
                </span>
            </Switch>
            </div>
        </Field>
    );
};

export default LabeledSwitch;