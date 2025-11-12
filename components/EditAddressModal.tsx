"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

interface EditAddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: {
    _id: string;
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    default: boolean;
  };
  onAddressUpdated: () => void;
}

const EditAddressModal = ({
  open,
  onOpenChange,
  address,
  onAddressUpdated,
}: EditAddressModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ ...address });
  const [errors, setErrors] = useState({ state: "", zip: "" });

  useEffect(() => {
    setFormData({ ...address });
  }, [address]);

  const validateForm = () => {
    const newErrors = { state: "", zip: "" };

    if (formData.state.length !== 2 || !/^[A-Z]{2}$/.test(formData.state)) {
      newErrors.state = "State must be 2 uppercase letters (e.g., NY, CA)";
    }
    if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)";
    }

    setErrors(newErrors);
    return !newErrors.state && !newErrors.zip;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "state" ? value.toUpperCase() : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleStateBlur = () => {
    if (formData.state && formData.state.length === 2) {
      setFormData((prev) => ({ ...prev, state: prev.state.toUpperCase() }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/address/${address._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error || "Failed to update address");

      toast.success("✅ Address updated successfully!");
      onAddressUpdated(); // ✅ Adresleri tekrar fetch et
      onOpenChange(false);
  
    } catch (error: unknown) {
      console.error("❌ Update address error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setFormData({ ...address });
      setErrors({ state: "", zip: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button className="mt-5" variant="outline">Edit Address</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Address Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                onBlur={handleStateBlur}
                maxLength={2}
                required
                className={errors.state ? "border-red-500" : ""}
              />
              {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code *</Label>
              <Input
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
                className={errors.zip ? "border-red-500" : ""}
              />
              {errors.zip && <p className="text-xs text-red-500">{errors.zip}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="default"
              name="default"
              checked={formData.default}
              onChange={handleChange}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="default" className="text-sm">
              Set as default shipping address
            </Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary/90">
              {loading ? "Updating..." : "Update Address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressModal;
