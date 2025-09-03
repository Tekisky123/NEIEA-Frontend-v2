import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Course overview is required").max(500),
  imageUrl: z.string().optional(),
  // instructor: z.string().min(1, "Instructor is required"),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Level is required",
  }),
  duration: z.string().min(1, "Duration is required"),
  targetAudience: z.array(z.string()).min(1, "Target audience is required"),
  fees: z.number().min(0, "Fees must be a positive number"),
  whatsappLink: z.string().url("Must be a valid URL"),
  timeSlots: z.array(z.string()).min(1, "At least one time slot must be selected"),
  isNew: z.boolean().optional(),
});

const NewCourse = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      // instructor: "",
      level: undefined,
      duration: "",
      targetAudience: [""],
      fees: 0,
      whatsappLink: "",
      timeSlots: [],
      isNew: false
    },
  });

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    // formData.append("instructor", data.instructor);
    formData.append("level", data.level);
    formData.append("duration", data.duration);
    data.targetAudience.forEach((ta) => formData.append("targetAudience[]", ta));
    formData.append("fees", data.fees.toString());
    formData.append("whatsappLink", data.whatsappLink);
    data.timeSlots.forEach((slot) => formData.append("timeSlots[]", slot));
    formData.append("isNew", data.isNew.toString());

    if (croppedImageUrl) {
      const imageFile = dataURLtoFile(croppedImageUrl, "courseImage.jpeg");
      formData.append("image", imageFile);
    }

    try {
      await axiosInstance.post("/admin/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Course created successfully");
      form.reset();
      setCroppedImageUrl("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Failed to create course");
      console.error("Create course error:", error);
    }
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
      reader.readAsDataURL(e.target.files[0]);
      setIsCropping(true);
    }
  };

  const getCroppedImg = () => {
    const image = imgRef.current;
    if (!image || !crop) {
      return;
    }
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }
    return canvas.toDataURL("image/jpeg");
  };

  const handleCrop = () => {
    const croppedDataUrl = getCroppedImg();
    if (croppedDataUrl) {
      setCroppedImageUrl(croppedDataUrl);
      form.setValue("imageUrl", croppedDataUrl);
      setIsCropping(false);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        16 / 9,
        width,
        height
      ),
      width,
      height
    );
    setCrop(newCrop);
  }

  return (
    <Card className="border-0 shadow-none rounded-none">
      <CardHeader>
        <CardTitle className="text-xl">Create New Course</CardTitle>
        <CardDescription>
          Fill in the details to create a new course
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="instructor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructor *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter instructor name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level *</FormLabel>
                    <FormControl>
                      <select {...field} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="">Select a level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 8 weeks" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fees *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter course fees"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Course Image *</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={onSelectFile}
                  />
                </FormControl>
                <div className="text-xs text-gray-500 mt-1">
                  Recommended size: <span className="font-medium">16:9 aspect ratio, at least 480x270px</span> to match the crop frame and ensure sharp display on all screens.
                </div>
                <div className="text-xs text-gray-400 mt-1 italic">
                  Example prompt for AI image generation:<br/>
                  <span className="text-gray-600">"A vibrant classroom scene with Indian children learning together, books and educational materials, bright and positive, 16:9 aspect ratio, 480x270px"</span>
                </div>
                <FormMessage />
              </FormItem>
            </div>
            <Dialog open={isCropping} onOpenChange={setIsCropping}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crop Image</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    aspect={16 / 9}
                  >
                    <img
                      ref={imgRef}
                      src={imgSrc}
                      alt="Source"
                      style={{ maxHeight: "70vh" }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCropping(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCrop}>Crop Image</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {croppedImageUrl && (
              <div>
                <FormLabel>Cropped Image Preview</FormLabel>
                <div className="mt-2 relative">
                  <img src={croppedImageUrl} alt="Cropped" className="h-48 rounded-md" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsCropping(true)}
                    >
                      Re-crop
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setCroppedImageUrl("");
                        setImgSrc("");
                        form.setValue("imageUrl", "");
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter course overview - What will be taught?"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter target audience, separated by commas"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.split(','))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsappLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Link *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter WhatsApp link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isNew"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Status</FormLabel>
                  <FormControl>
                    <div className="flex items-start space-x-3 space-y-0">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="space-y-1 leading-none">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Mark as New
                        </label>
                        <p className="text-sm text-gray-500">
                          Optional: Mark this course as new to highlight it on the courses page
                        </p>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="timeSlots"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Convenient Time Slots *</FormLabel>
                    <div className="text-sm text-gray-500 mt-1">
                      Select all time slots that are available for this course
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      "8:00 AM - 9:00 AM",
                      "9:00 AM - 10:00 AM",
                      "10:00 AM - 11:00 AM",
                      "11:00 AM - 12:00 PM",
                      "12:00 PM - 1:00 PM",
                      "1:00 PM - 2:00 PM",
                      "2:00 PM - 3:00 PM",
                      "3:00 PM - 4:00 PM",
                      "4:00 PM - 5:00 PM",
                      "5:00 PM - 6:00 PM",
                      "6:00 PM - 7:00 PM",
                      "7:00 PM - 8:00 PM",
                      "8:00 PM - 9:00 PM",
                      "9:00 PM - 10:00 PM",
                      "10:00 PM - 11:00 PM"
                    ].map((timeSlot) => (
                      <FormField
                        key={timeSlot}
                        control={form.control}
                        name="timeSlots"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={timeSlot}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(timeSlot)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, timeSlot])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== timeSlot
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {timeSlot}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                className="w-full md:w-auto bg-ngo-color4 hover:bg-ngo-color2 text-white font-bold shadow-lg border-2 transition-all duration-300"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewCourse;
