"use client";
import { useState } from "react";
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
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

interface AddAddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddressAdded: () => void;
}

const AddAddressModal = ({ open, onOpenChange, onAddressAdded }: AddAddressModalProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    default: false,
  });

  const [errors, setErrors] = useState({
    state: "",
    zip: "",
  });

  const validateForm = () => {
    const newErrors = {
      state: "",
      zip: "",
    };

    // State validation (2 letters, uppercase)
    if (formData.state.length !== 2 || !/^[A-Z]{2}$/.test(formData.state)) {
      newErrors.state = "State must be 2 uppercase letters (e.g., NY, CA)";
    }

    // ZIP code validation
    if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)";
    }

    setErrors(newErrors);
    return !newErrors.state && !newErrors.zip;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return;
    }

    setLoading(true);

    try {
      console.log('Sending address data:', {
        name: formData.name,
        email: user?.emailAddresses[0]?.emailAddress || formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state.toUpperCase(),
        zip: formData.zip,
        default: formData.default,
      });

      const response = await fetch('/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: user?.emailAddresses[0]?.emailAddress || formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state.toUpperCase(),
          zip: formData.zip,
          default: formData.default,
        }),
      });

      const result = await response.json();

      console.log('API response:', result);

      if (!result.success) {
        throw new Error(result.error || 'Failed to create address');
      }
      
      toast.success("✅ Address added successfully!");
      
      // Formu temizle
      setFormData({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        default: false,
      });
      setErrors({ state: "", zip: "" });
      
      // Modal'ı kapat ve callback'i çağır
      onOpenChange(false);
      if (onAddressAdded) {
        onAddressAdded();
      }
    } catch (error: any) {
      console.error("❌ Error adding address:", error);
      toast.error(`Failed to add address: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-uppercase for state field
    if (name === "state") {
      setFormData(prev => ({
        ...prev,
        [name]: value.toUpperCase()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleStateBlur = () => {
    if (formData.state && formData.state.length === 2) {
      setFormData(prev => ({
        ...prev,
        state: prev.state.toUpperCase()
      }));
    }
  };

  const handleDialogChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    // Modal kapandığında formu resetle
    if (!newOpen) {
      setFormData({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        default: false,
      });
      setErrors({ state: "", zip: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          Add New Address
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Address Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Address Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Home, Work, etc."
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground">
              A friendly name for this address
            </p>
          </div>

          {/* Email - Optional but pre-filled with user email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email || user?.emailAddresses[0]?.emailAddress || ""}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>

          {/* Street Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="123 Main St, Apt 4B"
              minLength={5}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              The street address including apartment/unit number
            </p>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="New York"
            />
          </div>

          {/* State and ZIP in one row */}
          <div className="grid grid-cols-2 gap-4">
            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                onBlur={handleStateBlur}
                required
                placeholder="NY"
                maxLength={2}
                className={errors.state ? "border-red-500" : ""}
              />
              {errors.state && (
                <p className="text-xs text-red-500">{errors.state}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Two letter code
              </p>
            </div>

            {/* ZIP Code */}
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code *</Label>
              <Input
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
                placeholder="12345"
                className={errors.zip ? "border-red-500" : ""}
              />
              {errors.zip && (
                <p className="text-xs text-red-500">{errors.zip}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Format: 12345 or 12345-6789
              </p>
            </div>
          </div>

          {/* Default Address Checkbox */}
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

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {loading ? "Adding..." : "Add Address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;