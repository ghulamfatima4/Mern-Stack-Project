import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Profile = () => {
  return (
    <div className='pt-20 min-h-screen bg-gray-100'>
    <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div>
            <div className='flex flex-col justify-center items-center bg-gray-100'>
                <h1 className='font-bold text-2xl mb-7 text-gray-800'>Update profile</h1>
                <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl ">
                  {/* <profile picture div */}
                    <div className="flex flex-col items-center">
                      <img
                        src= "/abc.jpeg"
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
                      />

                      <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                        Change Picture
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </Label>
                    </div>
                    {/* form */}
                    <form className='space-y-4 shadow-lg rounded-lg p-5 bg-white'>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <Label className="block text-sm font-medium">First Name</Label>
                          <Input type = 'text' name = 'firstName' className = 'w-full border rounded-lg px-3 py-2 mt-1'></Input>
                        </div>
                        <div>
                          <Label className="block text-sm font-medium">Last Name</Label>
                          <Input type = 'text' name = 'lastName' className = 'w-full border rounded-lg px-3 py-2 mt-1'></Input>
                        </div>
                      </div>
                      <div>
                        <Label className="block text-sm font-medium">Email</Label>
                        <Input type = 'email' name = 'email' disabled className = 'cursor-not-allowed w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100'></Input>
                      </div>
                      <div>
                        <Label className="block text-sm font-medium">Phone</Label>
                        <Input 
                          type = 'text' 
                          name = 'phoneNo' 
                          placeholder = "Enter your contact no"
                          className = 'w-full border rounded-lg px-3 py-2 mt-1'></Input>
                      </div>
                      <div>
                        <Label className="block text-sm font-medium">Address</Label>
                        <Input 
                          type = 'text' 
                          name = 'address' 
                          placeholder = "Enter your Address"
                          className = 'w-full border rounded-lg px-3 py-2 mt-1'></Input>
                      </div>
                        <div>
                          <Label className="block text-sm font-medium">City</Label>
                          <Input 
                          type = 'text' 
                          name = 'city' 
                          className = 'w-full border rounded-lg px-3 py-2 mt-1'></Input>
                        </div>
                        <div>
                          <Label className="block text-sm font-medium">Zip Code</Label>
                          <Input 
                          type = 'text' 
                          name = 'zipCode' 
                          className = 'w-full border rounded-lg px-3 py-2 mt-1'></Input>
                        </div>
                      <Button type= 'submit' className = 'text-white font-semibold w-full mt-4 bg-pink-600 hover:bg-pink-700 py-2 rounded-lg '>
                        Update Profile
                      </Button>
                    </form>
                </div>

            </div>
        </div>
      </TabsContent>
      <TabsContent value="orders">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
     
    </Tabs>
    </div>
  )
}

export default Profile