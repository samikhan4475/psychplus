"use client"

import { DataTable, LoadingPlaceholder } from "@/components"
import {Flex, ScrollArea } from "@radix-ui/themes"
import { ColumnDef } from "@tanstack/react-table"
import {LocationType} from "./actions/types"
import { columns } from "./columns"
import { LocationHeader } from "./location-header"
import { Filters } from "./filters/filters"
import { useEffect, useState } from "react"
import { getLocationList } from "./actions/get-location-list"

const LocationView = () => {
  const [data, setData] = useState<LocationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getLocationList({
        page: 1,
        payload: {
          searchQuery: '',
          country: '',
        },
      });
      if (response.state === "success") {
        const locationList = response.data?.locationList;
        setData(locationList);
      } else {
        return;
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Flex direction="column" gap="1">
      <LocationHeader />
      <Filters />
      {loading ?(
        <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
      ):(
      <Flex className="py-1 px-2">
        <ScrollArea>
          <DataTable<LocationType, ColumnDef<LocationType>>
            data={data}
            columns={columns()}
            disablePagination
            sticky
          />
        </ScrollArea>
      </Flex>
      )}
    </Flex>
  )
}

export { LocationView }