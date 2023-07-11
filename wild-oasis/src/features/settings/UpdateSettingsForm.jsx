import Spinner from '../../ui/Spinner';
import useSettings from '../../features/settings/useSettings';
import useUpdateSetting from '../../features/settings/useUpdateSetting';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function UpdateSettingsForm() {
    const {
        isLoading, settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice
        } = {}
    } = useSettings();

    console.log("UpdateSettingsForm render, maxGuestsPerBooking: ",maxGuestsPerBooking);

    const {updateSetting, isUpdating} = useUpdateSetting();

    console.log("isLoading: ",isLoading, " isUpdating: ",isUpdating);

    if (isLoading) return <Spinner/>;

    function handleBlur(e, field) {
        const {value} = e.target;

        if (!value) return;
        updateSetting({[field]: value});
    }

    // This time we are using UNCONTROLLED fields, so we will NOT store state
    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input
                    type='number'
                    defaultValue={minBookingLength}
                    onBlur={(e) => handleBlur(e, 'minBookingLength')} // 포커스가 input에서 벗어나면 handleBlur실행
                    disabled={isUpdating}
                    id='min-nights'
                />
            </FormRow>
            <FormRow label='Maximum nights/booking'>
                <Input
                    type='number'
                    defaultValue={maxBookingLength}
                    onBlur={(e) => handleBlur(e, 'maxBookingLength')}
                    disabled={isUpdating}
                    id='max-nights'
                />
            </FormRow>
            <FormRow label='Maximum guests/booking'>
                <Input
                    type='number'
                    defaultValue={maxGuestsPerBooking}
                    onBlur={(e) => handleBlur(e, 'maxGuestsPerBooking')}
                    disabled={isUpdating}
                    id='max-guests'
                />
            </FormRow>
            <FormRow label='Breakfast price'>
                <Input
                    type='number'
                    defaultValue={breakfastPrice}
                    onBlur={(e) => handleBlur(e, 'breakfastPrice')}
                    disabled={isUpdating}
                    id='breakfast-price'
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
