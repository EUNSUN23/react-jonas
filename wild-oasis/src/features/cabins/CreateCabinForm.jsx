import Input from "../../ui/Input";
import Form from "../../ui/Form.jsx";
import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Textarea from "../../ui/Textarea.jsx";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";
import styled from "styled-components";

const Label = styled.label`
  font-weight: 500;
`;

function CreateCabinForm() {
    // react-hook-form 라이브러리에서 제공하는 useForm hook 사용
    const {register, handleSubmit, reset, getValues, formState} = useForm();
    const {errors} = formState; // form validation 에러 객체

    const queryClient = useQueryClient();

    const {mutate, isLoading: isCreating} = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success('New cabin successfully created');
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
            reset(); // form reset
        },
        onError: err => toast.error(err.message)
    });

    // * register : input을 form의 input으로 등록한다. {...register('input name')} --> onBlur, onChange 속성 생성.
    // * handleSubmit : validation 성공(에러 x)하면 첫번째 오는 onSubmit함수를, validation 실패시(error) 두번째 인자인 onError함수를 실행한다.

    // data : register로 등록한 input의 data들
    function onSubmit(data) {
        mutate(data);
    }

    function onError(errors) {

    }


    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label='Cabin name' error={errors?.name?.message}>
                <Input type="text"
                       id="name"
                       disabled={isCreating}
                       {...register('name', {
                           required: 'This field is required'
                       })}/>
            </FormRow>

            <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
                    {...register('description')}/>

            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput id="image" accept="image/*"/>
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! -- reset버튼으로 동작(submit이 아니라) */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
