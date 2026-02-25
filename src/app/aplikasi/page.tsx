"use client";

import {useState} from "react";
import CardFeature from "@/components/CardFeatures";
import DetailCard, {type AppDetailData} from "@/components/DetailCard";

export default function Page() {
  const [selected, setSelected] = useState<AppDetailData | null>(null);

  const data = [
    {
      nomor_registrasi: "001",
      nama_aplikasi: "SI Perizinan",
      pengguna: "DPMPTSP",
      deskripsi: "Aplikasi layanan online full detail tanpa dipotong.",
      domain_aplikasi: "dpmptsp.go.id",
      url: "https://dpmptsp.go.id",
      kategori: "Unggulan",
    },
  ];

  return (
    <>
      <div className="flex gap-4">
        {data.map((item, i) => (
          <CardFeature
            key={i}
            {...item}
            onDetail={(detailData) => {
              setSelected(detailData);
            }}
          />
        ))}
      </div>

      <DetailCard data={selected} onClose={() => setSelected(null)} />
    </>
  );
}
