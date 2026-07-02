export const mapAddressResponse = (address) => {
    return {
        id: address.id,
        name: address.name,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        isDefault: address.isDefault
    };
};