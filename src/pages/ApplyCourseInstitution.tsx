import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { statesAndCities } from "@/lib/statesAndCities";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  institutionName: z.string().min(1, "Institution Name is required"),
  howDidYouFindUs: z.string().optional().refine(
    (val) => !val || val.length > 0,
    { message: "This field is required" }
  ),
  referredBy: z.string().optional().refine(
    (val) => !val || val.length > 0,
    { message: "Referred By is required" }
  ),
  coordinatorName: z.string().min(1, "Coordinator Name is required"),
  coordinatorContactNumber1: z.string().min(10, "Contact number must be at least 10 digits").max(10, "Contact number must be at most 10 digits").regex(/^\d+$/, "Contact number must contain only numbers"),
  coordinatorEmail: z.string().min(1, "Coordinator Email is required").email("Invalid email address"),
  coordinatorContactNumber2: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length === 10 && /^\d+$/.test(val)),
      "Contact number must be 10 digits and contain only numbers"
    ),
  coordinatorEmail2: z.string().email("Invalid email address").or(z.literal("")),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  numberOfStudents: z.string().min(1, "Number of Students is required"),
  startMonth: z.string().min(1, "Start Month is required"),
  studentList: z.instanceof(FileList).refine((files) => {
    if (files.length === 0) return true;
    const file = files[0];
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'image/jpeg', 'image/png'];
    return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024;
  }, "File must be an Excel or image file and less than 10 MB"),
  institutionLogo: z.instanceof(FileList).refine((files) => {
    if (files.length === 0) return true;
    const file = files[0];
    return file.type.startsWith('image/') && file.size <= 100 * 1024 * 1024;
  }, "File must be an image and less than 100 MB"),
  suitableTime: z.string().min(1, "Suitable Time is required"),
});

type FormData = z.infer<typeof formSchema>;

const ApplyCourseInstitution = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cities, setCities] = useState<string[]>([]);
  const [referredByOptions, setReferredByOptions] = useState([{ _id: "", name: "Select Option" }]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [category, setCategory] = useState("");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Get course data from location state (passed from Courses page)
  const courseData = location.state;
  const courseIds = courseData?.selectedCourses || [];
  const categoryName = courseData?.category || "";

  const fetchReferredByList = async () => {
    try {
      const response = await axiosInstance.get("/course/referred-by-list");
      if (response.data.success) {
        setReferredByOptions([{ _id: "", name: "Select Option" }, ...response.data.data]);
      }
    } catch (error) {
      toast.error("Failed to load referred by list");
    }
  };

  useEffect(() => {
    fetchReferredByList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
    if (name === "state") {
      const selectedState = statesAndCities.find((s) => s.state === value);
      setCities(selectedState ? selectedState.cities : []);
    }
  };

  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const startHour = 8 + i;
    const endHour = 9 + i;
    const startAmPm = startHour >= 12 ? 'PM' : 'AM';
    const endAmPm = endHour >= 12 ? 'PM' : 'AM';
    const displayStartHour = startHour > 12 ? startHour - 12 : startHour;
    const displayEndHour = endHour > 12 ? endHour - 12 : endHour;
    return `${displayStartHour} ${startAmPm} to ${displayEndHour} ${endAmPm}`;
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "studentList" && key !== "institutionLogo") {
          if (typeof value === 'string') {
            formData.append(key, value);
          }
        }
      });
      courseIds.forEach((id) => {
        formData.append("courseIds", id);
      });
      if (data.studentList && data.studentList.length > 0) {
        formData.append("studentList", data.studentList[0]);
      }
      if (data.institutionLogo && data.institutionLogo.length > 0) {
        formData.append("institutionLogo", data.institutionLogo[0]);
      }
      await axiosInstance.post(`/course/apply-institution`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Application submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Application submission failed");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 px-8 py-6 text-white">
              <h1 className="text-3xl font-bold mb-2">Institution Course Application</h1>
              <p className="text-green-100 text-lg">
                Applying for {courseIds.length} course{courseIds.length !== 1 ? 's' : ''} from {categoryName} category
              </p>
            </div>
            
            {/* Selected Courses Section */}
            {courseIds.length > 0 && (
              <div className="px-8 py-6 bg-gray-50 border-b">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Selected Courses</h2>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-600">
                    <strong>Number of Courses:</strong> {courseIds.length} course{courseIds.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-gray-600">
                    <strong>Category:</strong> {categoryName}
                  </p>
                  {/* <p className="text-gray-600 mt-2">
                    <strong>Course IDs:</strong> {courseIds.join(', ')}
                  </p> */}
                </div>
              </div>
            )}
            
            {/* Form Section */}
            <div className="px-8 py-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Institution Details</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                <Input id="email" {...register("email")} type="email" placeholder="Your Email" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700">Name of Institution/Madarsa/Organization/Other *</label>
                <Input id="institutionName" {...register("institutionName")} placeholder="Institution Name" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.institutionName && <p className="mt-2 text-sm text-red-600">{errors.institutionName.message}</p>}
              </div>
              <div>
                <label htmlFor="howDidYouFindUs" className="block text-sm font-medium text-gray-700">How did you find us?</label>
                <select id="howDidYouFindUs" {...register("howDidYouFindUs")} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select Option</option>
                  <option value="Facebook">Facebook</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Website">Website</option>
                  <option value="Other">Other</option>
                </select>
                {errors.howDidYouFindUs && <p className="mt-2 text-sm text-red-600">{errors.howDidYouFindUs.message}</p>}
              </div>
              <div>
                <label htmlFor="referredBy" className="block text-sm font-medium text-gray-700">Referred By</label>
                <select id="referredBy" {...register("referredBy")} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  {referredByOptions.map((option) => (
                    <option key={option._id} value={option.name}>{option.name}</option>
                  ))}
                </select>
                {errors.referredBy && <p className="mt-2 text-sm text-red-600">{errors.referredBy.message}</p>}
              </div>
              <div>
                <label htmlFor="coordinatorName" className="block text-sm font-medium text-gray-700">Institution coordinator's name *</label>
                <Input id="coordinatorName" {...register("coordinatorName")} placeholder="Coordinator Name" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.coordinatorName && <p className="mt-2 text-sm text-red-600">{errors.coordinatorName.message}</p>}
              </div>
              <div>
                <label htmlFor="coordinatorContactNumber1" className="block text-sm font-medium text-gray-700">Institution coordinator's Contact Number-1 *</label>
                <Input id="coordinatorContactNumber1" {...register("coordinatorContactNumber1")} placeholder="Contact Number" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.coordinatorContactNumber1 && <p className="mt-2 text-sm text-red-600">{errors.coordinatorContactNumber1.message}</p>}
              </div>
              <div>
                <label htmlFor="coordinatorEmail" className="block text-sm font-medium text-gray-700">Institution coordinator's Email *</label>
                <Input id="coordinatorEmail" {...register("coordinatorEmail")} type="email" placeholder="Coordinator Email" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.coordinatorEmail && <p className="mt-2 text-sm text-red-600">{errors.coordinatorEmail.message}</p>}
              </div>
              <div>
                <label htmlFor="coordinatorContactNumber2" className="block text-sm font-medium text-gray-700">Institution coordinator's Contact Number-2</label>
                <Input id="coordinatorContactNumber2" {...register("coordinatorContactNumber2")} placeholder="Contact Number" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.coordinatorContactNumber2 && <p className="mt-2 text-sm text-red-600">{errors.coordinatorContactNumber2.message}</p>}
              </div>
              <div>
                <label htmlFor="coordinatorEmail2" className="block text-sm font-medium text-gray-700">Institution coordinator's Email-2</label>
                <Input id="coordinatorEmail2" {...register("coordinatorEmail2")} type="email" placeholder="Coordinator Email" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.coordinatorEmail2 && <p className="mt-2 text-sm text-red-600">{errors.coordinatorEmail2.message}</p>}
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State *</label>
                <select id="state" {...register("state")} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select State</option>
                  {statesAndCities.map((stateData) => (
                    <option key={stateData.state} value={stateData.state}>{stateData.state}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-2 text-sm text-red-600">{errors.state.message}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                <select id="city" {...register("city")} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Institution/School's Address *</label>
                <Textarea id="address" {...register("address")} placeholder="Address" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
              </div>
              <div>
                <label htmlFor="numberOfStudents" className="block text-sm font-medium text-gray-700">Number of students who will be attending the class *</label>
                <Input id="numberOfStudents" {...register("numberOfStudents")} placeholder="Number of Students" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.numberOfStudents && <p className="mt-2 text-sm text-red-600">{errors.numberOfStudents.message}</p>}
              </div>
              <div>
                <label htmlFor="startMonth" className="block text-sm font-medium text-gray-700">When is the earliest you can start *</label>
                <select id="startMonth" {...register("startMonth")} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                {errors.startMonth && <p className="mt-2 text-sm text-red-600">{errors.startMonth.message}</p>}
              </div>
              <div>
                <label htmlFor="studentList" className="block text-sm font-medium text-gray-700">Upload Student List</label>
                <Input id="studentList" type="file" {...register("studentList")} accept=".xlsx, .xls, image/jpeg, image/png" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.studentList && <p className="mt-2 text-sm text-red-600">{errors.studentList.message}</p>}
              </div>
              <div>
                <label htmlFor="institutionLogo" className="block text-sm font-medium text-gray-700">Upload Institution Logo</label>
                <Input id="institutionLogo" type="file" {...register("institutionLogo")} accept="image/jpeg, image/png" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.institutionLogo && <p className="mt-2 text-sm text-red-600">{errors.institutionLogo.message}</p>}
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Suitable Time for Class *</label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <div key={time} className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <Input
                        type="radio"
                        id={`time-${time}`}
                        {...register("suitableTime")}
                        value={time}
                        className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                      />
                      <label htmlFor={`time-${time}`} className="ml-2 block text-sm text-gray-700 cursor-pointer">
                        {time}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.suitableTime && <p className="mt-2 text-sm text-red-600">{errors.suitableTime.message}</p>}
              </div>
            </div>
                <div className="col-span-1 md:col-span-2">
                  <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-colors duration-200">
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyCourseInstitution;
