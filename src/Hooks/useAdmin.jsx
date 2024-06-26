import { useGetUserIsAdminQuery } from '../Redux/features/admin/admin.api'
import useAuth from './useAuth'

const useAdmin = () => {
  const { user, loading } = useAuth()
  const { data: isAdmin, isLoading: isAdminLoading } = useGetUserIsAdminQuery(
    user?.email,
    { skip: loading },
  )

  return [isAdmin, isAdminLoading]
}
export default useAdmin
