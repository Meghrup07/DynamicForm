export interface UserForm {
    name: string,
    label: string,
    type: string,
    required: boolean,
    value: [
        {
            key: string,
            value: string
        },
    ]
}

export interface UserData {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: number,
    dob: number,
    userRole: string,
    gender: string
}

export interface AddUserForm {
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    dob: number,
    userRole: string,
    gender: string
}