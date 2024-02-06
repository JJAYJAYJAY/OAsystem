import {defineStore} from "pinia";
import {reactive} from "vue";

const usePersonalSpaceStore = defineStore(
    'personalSpace',
    () => {
        const personalSpaceInfo =reactive( {
            name: '',
            userImg: '',
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
        const setPersonalSpaceInfo = (name,img,studentNumber,classes,phone,politicalStatus,email,home,interesting,careerDirection,projectExperience,honors) => {
            personalSpaceInfo.name = name
            personalSpaceInfo.userImg = img
            personalSpaceInfo.studentNumber = studentNumber
            personalSpaceInfo.classes = classes
            personalSpaceInfo.phone = phone
            personalSpaceInfo.politicalStatus = politicalStatus
            personalSpaceInfo.email = email
            personalSpaceInfo.home = home
            personalSpaceInfo.interesting = interesting
            personalSpaceInfo.careerDirection = careerDirection
            personalSpaceInfo.projectExperience = projectExperience;
            personalSpaceInfo.honors = honors;
        }

        const setPersonalSpaceInfoFromRes = (res) => {
            let student=res.data.Student
            setPersonalSpaceInfo(
                student.name,
                "data:image/gif;base64,"+student.image,
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

        return {
            personalSpaceInfo,
            setPersonalSpaceInfo,
            setPersonalSpaceInfoFromRes
        }
    },
    {
        persist: true
    }
)
export default usePersonalSpaceStore;