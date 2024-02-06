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
            personalSpaceInfo.projectExperience = projectExperience
            personalSpaceInfo.honors = honors
        }

        return {
            personalSpaceInfo,
            setPersonalSpaceInfo
        }
    },
    {
        persist: true
    }
)
export default usePersonalSpaceStore;