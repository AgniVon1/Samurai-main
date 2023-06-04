import {instance} from "../instance";

export const securityAPI = {
    getCaptcha() {
        return (
            instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
        )
    }
}
type GetCaptchaUrlResponseType = {
    url: string
}