﻿using Sabio.Models;
using Sabio.Models.Domain.Addresses;
using Sabio.Models.Requests.Addresses;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IAddressService
    {
        int Add(AddressAddRequest modelAddress, int currentUserId);
        void Delete(int id);
        Address Get(int id);
        List<Address> GetRandomAddresses();
        void Update(AddressUpdateRequest modelAddress);
        Paged<Address> GetPage(int PageIndex, int PageSize);
    }
}