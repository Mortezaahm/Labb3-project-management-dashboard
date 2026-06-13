/*
name
email
role

Name

[________]

Email

[________]

Role

[ User ]

[ Save ]
 div className="bg-white flex flex-col shadow rounded-lg p-6 mb-6"
*/

import { mockUser } from "@/data/mockUser";

export default function UserInfoForm() {
    return (
        <>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
        </label>
        <input id="name" className="w-full border rounded py-2 px-4 mr-2 mb-4" defaultValue={mockUser.name} />
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input id="email" className="w-full border rounded py-2 px-4 mr-2 mb-4" defaultValue={mockUser.email} />
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <input id="role" className="w-full border rounded py-2 px-4 mr-2 mb-4" defaultValue={mockUser.role} readOnly />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Save Changes
        </button>
        </>
    )
}
