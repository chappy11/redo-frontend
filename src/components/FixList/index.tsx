import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getfix } from "../../service/RefubrishFix";
import useAlertOptions from "../../hooks/useAlertOptions";

type Props = {
  repubrishItem_id: string;
  refetch?: boolean;
  isShowRemove?: boolean;
};

export default function FixList(props: Props) {
  const [data, setData] = useState<any>([]);
  const { alertError } = useAlertOptions();

  const getFix = useCallback(async () => {
    try {
      if (!props.repubrishItem_id) {
        return;
      }
      const resp = await getfix(props.repubrishItem_id);

      setData(resp.data.data);
    } catch (error) {
      alertError();
    }
  }, [props.repubrishItem_id]);

  useEffect(() => {
    getFix();
  }, [getFix, props.refetch, props.repubrishItem_id]);

  return (
    <div>
      {data.length < 1 ? (
        <div>
          <p>No Data found</p>
        </div>
      ) : (
        <div>
          {" "}
          {data.map((val: any, i: number) => (
            <div
              key={i.toString()}
              className=" flex w-full py-2 border-b-2 border-b-slate-200 text-sm"
            >
              <div className=" flex-1 ">
                {" "}
                <p className=" text-primary font-semibold">{val.fix}</p>
              </div>

              <p className=" text-red-400">{val.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
