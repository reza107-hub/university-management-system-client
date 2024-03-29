import { useEffect, useState } from "react";
import ReUsable from "../../../../Components/Dialog/ReUsableModaal";
import { academicSemesterContent } from "./AcademicSemester.constant";
import SearchSvg from "../../../../Components/SearchSvg/SearchSvg";
import Table from "../../../../Components/Table/Table";

import Swal from "sweetalert2";
import {
  useAddAcademicSemesterMutation,
  useGetAcademicSemesterQuery,
} from "../../../../Redux/features/AcademicSemester/AcademicSemester.api";

const AcademicSemester = () => {
  const [
    addAcademicSemester,
    { data: academicSemesterData, error: academicSemesterError },
  ] = useAddAcademicSemesterMutation();

  const { data: getAcademicSemesterData } =
    useGetAcademicSemesterQuery(undefined);

  let [isOpen, setIsOpen] = useState(false);
  let [isOpenForUpdate, setIsOpenForUpdate] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (data) => {
    addAcademicSemester(data);
    closeModal();
  };

  // update section
  const openModalForUpdate = () => {
    setIsOpenForUpdate(true);
  };
  const closeModalForUpdate = () => {
    setIsOpenForUpdate(false);
  };
  // pending
  const onSubmitForUpdate = (data) => {
    console.log(data);
    closeModalForUpdate();
  };
  useEffect(() => {
    if (academicSemesterData?.success === true) {
      Swal.fire({
        icon: "success",
        title: academicSemesterData?.message,
      });
    }
    if (academicSemesterError?.data?.success === false) {
      Swal.fire({
        icon: "error",
        title: academicSemesterError?.data?.message,
      });
    }
  }, [academicSemesterData, academicSemesterError]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <ReUsable
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={onSubmit}
        Content={academicSemesterContent}
      />
      {/* this is for update */}
      <ReUsable
        isOpen={isOpenForUpdate}
        closeModal={closeModalForUpdate}
        onSubmit={onSubmitForUpdate}
        Content={academicSemesterContent}
      />
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchSvg />
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
        <div>
          <button type="button" onClick={openModal} className="btn-primary">
            Add Academic Semester
          </button>
        </div>
      </div>
      {/* TAble */}
      <Table Content={academicSemesterContent}>
        {getAcademicSemesterData?.data?.map((semester) => (
          <tr
            key={semester?._id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td className="px-6 py-4 font-bold text-lg">{semester?.name}</td>
            <td className="px-6 py-4 font-bold text-lg">{semester?.code}</td>
            <td className="px-6 py-4 font-bold text-lg">{semester?.year}</td>
            <td className="px-6 py-4 font-bold text-lg">
              {semester?.startMonth}
            </td>
            <td className="px-6 py-4 font-bold text-lg">
              {semester?.endMonth}
            </td>
            <td className="px-6 py-4">
              <button onClick={openModalForUpdate} className={`btn-primary`}>
                Update
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default AcademicSemester;
