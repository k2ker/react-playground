"use client";
import { memo } from "react";
import axios from "axios";
import Input from "./ui/Input";
import { useForm } from "react-hook-form";
import { Validation } from "@/utils/validation";
import { useEmployeePatch, useEmployeePost } from "@/api/employee";

interface Props {
  initailValue?: Employee | null;
  trigger?(): void | null;
}

const EmployeeForm = ({ initailValue, trigger }: Props) => {
  const useEmployeePostMutation = useEmployeePost();
  const useEmployeePatchMutation = useEmployeePatch();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormInputs>({
    mode: "onChange",
    defaultValues: (initailValue as EmployeeFormInputs) ?? null,
  });

  const onSubmit = async (data: EmployeeFormInputs) => {
    if (initailValue) {
      useEmployeePatchMutation.mutate(
        {
          id: initailValue.id,
          params: {
            FirstName: data.FirstName,
            LastName: data.LastName,
            Age: Number(data.Age),
            Salary: Number(data.Salary),
          },
        },
        {
          onSuccess: (data) => {
            alert("수정완료");
          },
          onError: (error) => {
            axios.isAxiosError(error)
              ? alert(error?.response?.data?.message)
              : alert("수정실패");
          },
          onSettled() {
            trigger && trigger();
          },
        },
      );
      return;
    }

    useEmployeePostMutation.mutate(
      {
        FirstName: data.FirstName,
        LastName: data.LastName,
        Age: Number(data.Age),
        Salary: Number(data.Salary),
      },
      {
        onSuccess(data) {
          reset();
          alert("저장완료");
        },
        onError(error) {
          axios.isAxiosError(error)
            ? alert(error?.response?.data?.message)
            : alert("저장실패");
        },
      },
    );
  };

  return (
    <form
      className="flex w-full flex-col  gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="FirstName"
        error={errors.FirstName?.message}
        success={!!(watch("FirstName") && !errors.FirstName?.message)}
        {...register("FirstName", {
          ...Validation.FirstName,
        })}
      />
      <Input
        label="LastName"
        error={errors.LastName?.message}
        success={!!(watch("LastName") && !errors.LastName?.message)}
        {...register("LastName", {
          ...Validation.LastName,
        })}
      />
      <Input
        type="number"
        label="Age"
        error={errors.Age?.message}
        success={!!(watch("Age") && !errors.Age?.message)}
        {...register("Age", {
          ...Validation.Age,
        })}
      />
      <Input
        type="number"
        label="Salary"
        error={errors.Salary?.message}
        success={!!(watch("Salary") && !errors.Salary?.message)}
        {...register("Salary", {
          ...Validation.Salary,
        })}
      />
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        disabled={
          useEmployeePatchMutation.isLoading ||
          useEmployeePostMutation.isLoading
        }
      >
        저장
      </button>
    </form>
  );
};

export default memo(EmployeeForm);
