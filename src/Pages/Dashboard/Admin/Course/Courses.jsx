import { useForm } from 'react-hook-form'
import { Dialog, Tab, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import CourseTable from './CourseTable'
import {
  useCreateCourseMutation,
  useDepartmentWiseCoursesQuery,
} from '../../../../Redux/features/course/courseApi'
import Swal from 'sweetalert2'
import { useGetDepartmentQuery } from '../../../../Redux/features/Department/department.api'
const Courses = () => {
  const {data:departmentWiseCoursesData} = useDepartmentWiseCoursesQuery()

  const { data: departmentData } = useGetDepartmentQuery()
// console.log(departmentData)
  const [createCourse] = useCreateCourseMutation()
  let [isOpen, setIsOpen] = useState(false)
  //-----------------------------------------------------
  const openModal = () => {
    setIsOpen(!isOpen)
  }
  const closeModal = () => {
    setIsOpen(!isOpen)
  }
  const { handleSubmit, register, reset } = useForm()
  //---------------------------------------------------


  //------------------------------------------------------
  const onSubmit = async (data) => {
    try {
      Swal.fire({
        title: 'wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })
      data.credits = Number(data.credits)
      const res = await createCourse(data).unwrap()
      Swal.fire({
        title: res.message,
        icon: 'success',
        timer: 1500,
      })
    } catch (error) {
      Swal.fire({
        title: error?.data?.message,
        text: error?.data?.errorMessage,
        icon: 'error',
      })
    }
    reset()
    setIsOpen(!isOpen)
  }
//....................................................


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <label className="sr-only">Search</label>

        {/* <SearchName
          // setParams={setParams}
          SearchPlaceHolderName="course name"
          searchTerm='searchTerm'
        /> */}
      </div>

      {/* modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-3">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Title
                      </Dialog.Title>
                      <input
                        className="w-full rounded-md"
                        type="text"
                        {...register('title')}
                      />
                    </div>
                    <div className="space-y-3">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Code
                      </Dialog.Title>
                      <input
                        className="w-full rounded-md"
                        type="text"
                        {...register('code')}
                      />
                    </div>
                    <div className="space-y-3">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Credits
                      </Dialog.Title>
                      <input
                        className="w-full rounded-md"
                        type="number"
                        step=".01"
                        {...register('credits')}
                      />
                    </div>
                    <div className="space-y-3">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Department
                      </Dialog.Title>
                      <select
                        className="w-full rounded-md"
                        {...register('departmentId')}
                      >
                        {departmentData?.data?.map((result) => (
                          <option key={result?._id} value={result?._id}>
                            {result?.shortForm}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="btn-primary mt-5"
                      type="submit"
                      value="submit"
                    >
                      Submit
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <div>
          {/* modal  button*/}
          <button type="button" onClick={openModal} className="btn-primary">
            Create Course
          </button>
        </div>

        {/* Offer Course section */}
        <div>

        </div>
      </div>

      {/* table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Tab.Group>
        <Tab.List className="flex space-x-4">
          {departmentWiseCoursesData?.data?.map(({ department }) => (
            <Tab
              key={department._id}
              className={({ selected }) =>
                `${selected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded-md cursor-pointer`
              }
            >
              {department.shortForm}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {departmentWiseCoursesData?.data?.map(({ department, courses }) => (
            <Tab.Panel key={department._id}>
              <CourseTable courses={courses} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
    </div>
  )
}

export default Courses
