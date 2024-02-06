import {defineStore} from "pinia";
import {reactive} from "vue";

export class Teacher{
    constructor(teacherId,teacherName,department,office,phoneNumber,email){
        this.teacherId = teacherId
        this.teacherName = teacherName
        this.department = department
        this.office = office
        this.phoneNumber = phoneNumber
        this.email = email
    }
}

const useTeacherStore = defineStore(
    'teacher',
    () => {
        const teacherInfo = reactive({
            total: 0,
            teacherList: []
        })
        const setTeacherInfo= (total,teacherList) => {
            teacherInfo.total = total
            teacherInfo.teacherList = teacherList
        }
        return {
            teacherInfo,
            setTeacherInfo
        }
    },
    {
        persist: true
    }
)

export default useTeacherStore;