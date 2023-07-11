import Input from "../../ui/Input";
import Form from "../../ui/Form.jsx";
import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Textarea from "../../ui/Textarea.jsx";
import FormRow from "../../ui/FormRow.jsx";

import {useForm} from "react-hook-form";
import useCreateCabin from "./useCreateCabin.js";
import useEditCabin from "./useEditCabin.js";
import {createContext} from "react";



function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
    const {createCabin, isCreating} = useCreateCabin();
    const {editCabin, isEditing} = useEditCabin();
    const isWorking = isCreating || isEditing;

    const {id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId); // editId가 있으면 true, 없으면 false

    const {register, handleSubmit, reset, getValues, formState} = useForm({
        // editSession이면 defaultValue 설정
        defaultValues: isEditSession ? editValues : {}
    });

    const {errors} = formState; // form validation 에러 객체

    // data : register로 등록한 input의 data들
    function onSubmit(data) {
        const image = typeof data.image === 'string' ? data.image : data.image[0];

        if (isEditSession) editCabin({newCabinData: {...data, image}, id: editId});
        else createCabin(
            {...data, image: image},
            { // onSuccess함수를 인자로 받을 수 있다.
                onSuccess: (data) => {
                    // data : mutate함수(여기선 createCabin)이 반환한 값을 인자로 받는다.
                    reset();
                    onCloseModal?.();
                }
            });
    }

    function onError() {

    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal':'regular'}>
            <FormRow label='Cabin name' error={errors?.name?.message}>
                <Input type="text"
                       id="name"
                       disabled={isWorking}
                       {...register('name', {
                           required: 'This field is required'
                       })}/>
            </FormRow>

            <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register('maxCapacity', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1'
                        }
                    })}/>
            </FormRow>

            <FormRow label='Regular price' error={errors?.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register('regularPrice', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1'
                        }
                    })} />
            </FormRow>

            <FormRow label='Discount' error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isWorking}
                    {...register('discount', {
                        required: 'This field is required',
                        validate: (value) => value < getValues().regularPrice || 'Discount should be less than regular price'
                    })}/>
            </FormRow>

            <FormRow label='Description for website' error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    {...register('description')}/>

            </FormRow>

            <FormRow label='Cabin photo' error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register('image', {
                        required: isEditSession ? false : 'This field is required'
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! -- reset버튼으로 동작(submit이 아니라) */}
                <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
