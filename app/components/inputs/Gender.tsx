import Select from "react-select";

export type GenderOption = {
    label: string;
    value: string;
};

interface GenderSelectProps {
    value?: GenderOption;
    onChange: (value: GenderOption) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ value, onChange }) => {
    const genderOptions: GenderOption[] = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    return (
        <div>
            <Select
                placeholder="Select Gender"
                isClearable
                options={genderOptions}
                value={value}
                onChange={(value) => onChange(value as GenderOption)}
                className="react-select-container"
                classNamePrefix="react-select"
            />
        </div>
    );
};

export default GenderSelect;
