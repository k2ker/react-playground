"use client";
import { memo, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useEmployeeDelete, useEmployeeGet } from "@/api/employee";
import Modal from "./Modal/Modal";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const { data: employee } = useEmployeeGet();
  const useEmployeeDeleteMutation = useEmployeeDelete();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  const handleClickEdit = useCallback((item: Employee) => {
    setEditModalOpen(true);
    setSelectedEmployee(item);
  }, []);

  const handleClickDelete = useCallback((id: string) => {
    useEmployeeDeleteMutation.mutate(id, {
      onSuccess: (data) => {
        alert("삭제완료");
      },
      onError: (error) => {
        axios.isAxiosError(error)
          ? alert(error?.response?.data?.message)
          : alert("삭제실패");
      },
    });
  }, []);

  return (
    <>
      <section className="w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Salary
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Age
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {employee?.map((item: Employee) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-6 py-4">{item.No}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {item.FirstName}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{item.LastName}</td>
                <td className="whitespace-nowrap px-6 py-4">{item.Salary}</td>
                <td className="whitespace-nowrap px-6 py-4">{item.Age}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    className="mr-2 text-blue-500 hover:text-blue-700"
                    onClick={() => handleClickEdit(item)}
                  >
                    수정
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleClickDelete(item.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {editModalOpen && (
        <Modal onClosed={() => setEditModalOpen(false)}>
          <div className="w-full rounded bg-white p-4">
            <EmployeeForm
              initailValue={selectedEmployee}
              trigger={() => setEditModalOpen(false)}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default memo(EmployeeList);
