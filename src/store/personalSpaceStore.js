import {defineStore} from "pinia";
import {reactive} from "vue";

const usePersonalSpaceStore = defineStore(
    'personalSpace',
    () => {
        const personalSpaceInfo =reactive( {
            studentNumber: '',
            classes: '',
            phone: '',
            PoliticalStatus: '',
            email: '',
            home:'',
            interesting:'',
            careerDirection:'',
        })
        const setPersonalSpaceInfo = (studentNumber,classes,phone,PoliticalStatus,email,home,interesting,careerDirection) => {
            personalSpaceInfo.studentNumber = studentNumber
            personalSpaceInfo.classes = classes
            personalSpaceInfo.phone = phone
            personalSpaceInfo.PoliticalStatus = PoliticalStatus
            personalSpaceInfo.email = email
            personalSpaceInfo.home = home
            personalSpaceInfo.interesting = interesting
            personalSpaceInfo.careerDirection = careerDirection
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