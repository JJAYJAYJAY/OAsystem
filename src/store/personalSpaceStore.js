import {defineStore} from "pinia";
import {reactive} from "vue";

const usePersonalSpaceStore = defineStore(
    'personalSpace',
    () => {
        const personalSpaceInfo =reactive( {
            name: '',
            userImg: ''
        })
        const studentInfo = reactive({
            studentNumber: '',
            classes: '',
            phone: '',
            politicalStatus: '',
            email: '',
            home:'',
            interesting:'',
            careerDirection:'',
            honors:'',
            projectExperience:'',
        })

        const teacherInfo = reactive({

        })
        const setPersonalSpaceInfo = (name,img) => {
            personalSpaceInfo.name = name
            personalSpaceInfo.userImg = img
        }
        const setStudentInfo = (studentNumber,classes,phone,politicalStatus,email,home,interesting,careerDirection,projectExperience,honors) => {
            studentInfo.studentNumber = studentNumber
            studentInfo.classes = classes
            studentInfo.phone = phone
            studentInfo.politicalStatus = politicalStatus
            studentInfo.email = email
            studentInfo.home = home
            studentInfo.interesting = interesting
            studentInfo.careerDirection = careerDirection
            studentInfo.projectExperience = projectExperience;
            studentInfo.honors = honors;
        }

        const setPersonalSpaceStudentInfoFromRes = (res) => {
            let student=res.data.Student
            setPersonalSpaceInfo(
                student.name,
                "data:image/gif;base64,"+student.image
            )
            setStudentInfo(
                student.student_id,
                student.class_room,
                student.phone_number,
                student.political_status,
                student.email,
                student.home_address,
                student.interesting,
                student.employment_intention,
                student.project_experience,
                student.honors,
            )
        }

        const setPersonalSpaceTeacherInfoFromRes = (res) => {
            let teacher=res.data.Teacher
            setPersonalSpaceInfo(
                teacher.name,
                "data:image/gif;base64,"+teacher.image
            )
        }
        return {
            personalSpaceInfo,
            setPersonalSpaceInfo,
            setPersonalSpaceStudentInfoFromRes,
            studentInfo,
            setPersonalSpaceTeacherInfoFromRes,
            teacherInfo
        }
    },
    {
        persist: true
    }
)
export default usePersonalSpaceStore;