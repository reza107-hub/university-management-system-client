import { useForm } from 'react-hook-form'
import useAuth from '../../../Hooks/useAuth'
import Swal from 'sweetalert2'
import {
  useCreateUserAdditionalInfoMutation,
  useGetPresentUserQuery,
} from '../../../Redux/features/User/UserApi'

const AdditionalInfoForm = () => {
  const { user } = useAuth()
  const { data: presentUser } = useGetPresentUserQuery(user?.email)
  const [createUserAdditionalInfo] = useCreateUserAdditionalInfoMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    data.userId = presentUser?.data?._id
    data.name = user?.displayName
    data.email = presentUser?.data?.email
    data.image = user?.photoURL

    try {
      Swal.fire({
        title: 'wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })
      const res = await createUserAdditionalInfo(data).unwrap()
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
  }
  return (
    <div>
      <p className="text-primary text-2xl font-bold">
        Set Additional Information
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="mb-3 ">
            <label htmlFor="dateOfBirth" className="col-sm-2 col-form-label">
              Date of Birth
            </label>
            <div className="">
              <input
                {...register('dateOfBirth', { required: true })}
                type="date"
                className="form-control w-full rounded-md text-black"
                id="dateOfBirth"
              />
              {errors.dateOfBirth && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="gender" className="col-sm-2 col-form-label">
              Gender
            </label>
            <div className="">
              <select
                {...register('gender', { required: true })}
                className="form-select w-full text-black"
                id="gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
          </div>
        </div>

        <div className="">
          <div className="mb-3 ">
            <label htmlFor="contactNumber" className="col-sm-2 col-form-label">
              Contact Number
            </label>
            <div className="">
              <input
                {...register('contactNumber', {
                  required: true,
                  pattern: /^\+*[0-9]*$/,
                })}
                type="tel"
                className="form-control w-full rounded-md text-black"
                id="contactNumber"
              />
              {errors.contactNumber && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
          </div>
        </div>

        <div className="">
          <div className="mb-3">
            <label htmlFor="presentAddress" className="col-sm-2 col-form-label">
              Present Address
            </label>
            <div className="">
              <textarea
                {...register('presentAddress', { required: true })}
                className="form-control w-full rounded-md text-black"
                id="presentAddress"
              ></textarea>
              {errors.presentAddress && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="permanentAddress"
              className="col-sm-2 col-form-label"
            >
              Permanent Address
            </label>
            <div className="">
              <textarea
                {...register('permanentAddress', { required: true })}
                className="form-control w-full rounded-md text-black"
                id="permanentAddress"
              ></textarea>
              {errors.permanentAddress && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
          </div>
        </div>

        <div className="">
          <div className="mb-3 ">
            <label htmlFor="bloodGroup" className="col-sm-2 col-form-label">
              Blood Group
            </label>
            <div className="">
              <select
                {...register('bloodGroup', { required: true })}
                className="form-select w-full text-black"
                id="bloodGroup"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {errors.bloodGroup && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
          </div>
        </div>

        {/* --------------------- */}

        <div className="mb-3">
          <div className=" offset-sm-2 text-center">
            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdditionalInfoForm
