import path from "node:path";
import { cache } from "react";
import { parse } from "csv-parse/sync";
import { readFile } from "node:fs/promises";

export interface Entry {
  entry?: string;
  variant?: string;
  id?: string;
  djt_id?: string;
  dkw_id?: string;
  radical?: string;
  jis_char?: string;
  jis_notes?: string;
  ucs?: string;
  notes?: string;
  has_shapes?: string;
  khi_id?: string;
  khi_shape_count?: string;
  khi_sample_count?: string;
  khm_id?: string;
  khm_shape_count?: string;
  khm_sample_count?: string;
  hok_id?: string;
  hok_shape_count?: string;
  hok_sample_count?: string;
  kyd_id?: string;
  kyd_shape_count?: string;
  kyd_sample_count?: string;
  kar_id?: string;
  kar_shape_count?: string;
  kar_sample_count?: string;
  kae_id?: string;
  kae_shape_count?: string;
  kae_sample_count?: string;
  tzj_id?: string;
  tzj_shape_count?: string;
  tzj_sample_count?: string;
  hos_id?: string;
  hos_shape_count?: string;
  hos_sample_count?: string;
  nak_id?: string;
  nak_shape_count?: string;
  nak_sample_count?: string;
  jhk_id?: string;
  jhk_shape_count?: string;
  jhk_sample_count?: string;
  ink_id?: string;
  ink_shape_count?: string;
  ink_sample_count?: string;
  nkk_id?: string;
  nkk_shape_count?: string;
  nkk_sample_count?: string;
  kcc_id?: string;
  kcc_shape_count?: string;
  kcc_sample_count?: string;
  wad_id?: string;
  wad_shape_count?: string;
  wad_sample_count?: string;
  doh_id?: string;
  doh_shape_count?: string;
  doh_sample_count?: string;
  tzs_id?: string;
  tzs_shape_count?: string;
  tzs_sample_count?: string;
  kak_id?: string;
  kak_shape_count?: string;
  kak_sample_count?: string;
  sys_id?: string;
  sys_shape_count?: string;
  sys_sample_count?: string;
  tsu_id?: string;
  tsu_shape_count?: string;
  tsu_sample_count?: string;
  hod_id?: string;
  hod_shape_count?: string;
  hod_sample_count?: string;
  gok_id?: string;
  gok_shape_count?: string;
  gok_sample_count?: string;
  k24_id?: string;
  k24_shape_count?: string;
  k24_sample_count?: string;
  kcj_id?: string;
  kcj_shape_count?: string;
  kcj_sample_count?: string;
  kbk_id?: string;
  kbk_shape_count?: string;
  kbk_sample_count?: string;
  sik_id?: string;
  sik_shape_count?: string;
  sik_sample_count?: string;
  skk_id?: string;
  skk_shape_count?: string;
  skk_sample_count?: string;
  kyu_id?: string;
  kyu_shape_count?: string;
  kyu_sample_count?: string;
  ksk_id?: string;
  ksk_shape_count?: string;
  ksk_sample_count?: string;
  wan_id?: string;
  wan_shape_count?: string;
  wan_sample_count?: string;
  kss_id?: string;
  kss_shape_count?: string;
  kss_sample_count?: string;
  kyo_id?: string;
  kyo_shape_count?: string;
  kyo_sample_count?: string;
  smk_id?: string;
  smk_shape_count?: string;
  smk_sample_count?: string;
  jou_id?: string;
  jou_shape_count?: string;
  jou_sample_count?: string;
  keg_id?: string;
  keg_shape_count?: string;
  keg_sample_count?: string;
  dng_id?: string;
  dng_shape_count?: string;
  dng_sample_count?: string;
  mam_id?: string;
  mam_shape_count?: string;
  mam_sample_count?: string;
  drt_id?: string;
  drt_shape_count?: string;
  drt_sample_count?: string;
  kgk_id?: string;
  kgk_shape_count?: string;
  kgk_sample_count?: string;
  myz_id?: string;
  myz_shape_count?: string;
  myz_sample_count?: string;
  kda_id?: string;
  kda_shape_count?: string;
  kda_sample_count?: string;
  sok_id?: string;
  sok_shape_count?: string;
  sok_sample_count?: string;
  yhk_id?: string;
  yhk_shape_count?: string;
  yhk_sample_count?: string;
  nto_id?: string;
  nto_shape_count?: string;
  nto_sample_count?: string;
  nkm_id?: string;
  nkm_shape_count?: string;
  nkm_sample_count?: string;
  okd_id?: string;
  okd_shape_count?: string;
  okd_sample_count?: string;
  kmi_id?: string;
  kmi_shape_count?: string;
  kmi_sample_count?: string;
  zkd_id?: string;
  zkd_shape_count?: string;
  zkd_sample_count?: string;
  jyu_id?: string;
  jyu_shape_count?: string;
  jyu_sample_count?: string;
  fhs_id?: string;
  fhs_shape_count?: string;
  fhs_sample_count?: string;
  khh_id?: string;
  khh_shape_count?: string;
  khh_sample_count?: string;
  kkh_id?: string;
  kkh_shape_count?: string;
  kkh_sample_count?: string;
  ini_id?: string;
  ini_shape_count?: string;
  ini_sample_count?: string;
  sai_id?: string;
  sai_shape_count?: string;
  sai_sample_count?: string;
  kad_id?: string;
  kad_shape_count?: string;
  kad_sample_count?: string;
  ykk_id?: string;
  ykk_shape_count?: string;
  ykk_sample_count?: string;
  saa_id?: string;
  saa_shape_count?: string;
  saa_sample_count?: string;
  sab_id?: string;
  sab_shape_count?: string;
  sab_sample_count?: string;
  wks_id?: string;
  wks_shape_count?: string;
  wks_sample_count?: string;
  wke_id?: string;
  wke_shape_count?: string;
  wke_sample_count?: string;
  sgs_id?: string;
  sgs_shape_count?: string;
  sgs_sample_count?: string;
  sts_id?: string;
  sts_shape_count?: string;
  sts_sample_count?: string;
  kkd_id?: string;
  kkd_shape_count?: string;
  kkd_sample_count?: string;
}
const headers = [
  "entry",
  "variant",
  "id",
  "djt_id",
  "dkw_id",
  "radical",
  "jis_char",
  "jis_notes",
  "ucs",
  "notes",
  "has_shapes",
  "khi_id",
  "khi_shape_count",
  "khi_sample_count",
  "khm_id",
  "khm_shape_count",
  "khm_sample_count",
  "hok_id",
  "hok_shape_count",
  "hok_sample_count",
  "kyd_id",
  "kyd_shape_count",
  "kyd_sample_count",
  "kar_id",
  "kar_shape_count",
  "kar_sample_count",
  "kae_id",
  "kae_shape_count",
  "kae_sample_count",
  "tzj_id",
  "tzj_shape_count",
  "tzj_sample_count",
  "hos_id",
  "hos_shape_count",
  "hos_sample_count",
  "nak_id",
  "nak_shape_count",
  "nak_sample_count",
  "jhk_id",
  "jhk_shape_count",
  "jhk_sample_count",
  "ink_id",
  "ink_shape_count",
  "ink_sample_count",
  "nkk_id",
  "nkk_shape_count",
  "nkk_sample_count",
  "kcc_id",
  "kcc_shape_count",
  "kcc_sample_count",
  "wad_id",
  "wad_shape_count",
  "wad_sample_count",
  "doh_id",
  "doh_shape_count",
  "doh_sample_count",
  "tzs_id",
  "tzs_shape_count",
  "tzs_sample_count",
  "kak_id",
  "kak_shape_count",
  "kak_sample_count",
  "sys_id",
  "sys_shape_count",
  "sys_sample_count",
  "tsu_id",
  "tsu_shape_count",
  "tsu_sample_count",
  "hod_id",
  "hod_shape_count",
  "hod_sample_count",
  "gok_id",
  "gok_shape_count",
  "gok_sample_count",
  "k24_id",
  "k24_shape_count",
  "k24_sample_count",
  "kcj_id",
  "kcj_shape_count",
  "kcj_sample_count",
  "kbk_id",
  "kbk_shape_count",
  "kbk_sample_count",
  "sik_id",
  "sik_shape_count",
  "sik_sample_count",
  "skk_id",
  "skk_shape_count",
  "skk_sample_count",
  "kyu_id",
  "kyu_shape_count",
  "kyu_sample_count",
  "ksk_id",
  "ksk_shape_count",
  "ksk_sample_count",
  "wan_id",
  "wan_shape_count",
  "wan_sample_count",
  "kss_id",
  "kss_shape_count",
  "kss_sample_count",
  "kyo_id",
  "kyo_shape_count",
  "kyo_sample_count",
  "smk_id",
  "smk_shape_count",
  "smk_sample_count",
  "jou_id",
  "jou_shape_count",
  "jou_sample_count",
  "keg_id",
  "keg_shape_count",
  "keg_sample_count",
  "dng_id",
  "dng_shape_count",
  "dng_sample_count",
  "mam_id",
  "mam_shape_count",
  "mam_sample_count",
  "drt_id",
  "drt_shape_count",
  "drt_sample_count",
  "kgk_id",
  "kgk_shape_count",
  "kgk_sample_count",
  "myz_id",
  "myz_shape_count",
  "myz_sample_count",
  "kda_id",
  "kda_shape_count",
  "kda_sample_count",
  "sok_id",
  "sok_shape_count",
  "sok_sample_count",
  "yhk_id",
  "yhk_shape_count",
  "yhk_sample_count",
  "nto_id",
  "nto_shape_count",
  "nto_sample_count",
  "nkm_id",
  "nkm_shape_count",
  "nkm_sample_count",
  "okd_id",
  "okd_shape_count",
  "okd_sample_count",
  "kmi_id",
  "kmi_shape_count",
  "kmi_sample_count",
  "zkd_id",
  "zkd_shape_count",
  "zkd_sample_count",
  "jyu_id",
  "jyu_shape_count",
  "jyu_sample_count",
  "fhs_id",
  "fhs_shape_count",
  "fhs_sample_count",
  "khh_id",
  "khh_shape_count",
  "khh_sample_count",
  "kkh_id",
  "kkh_shape_count",
  "kkh_sample_count",
  "ini_id",
  "ini_shape_count",
  "ini_sample_count",
  "sai_id",
  "sai_shape_count",
  "sai_sample_count",
  "kad_id",
  "kad_shape_count",
  "kad_sample_count",
  "ykk_id",
  "ykk_shape_count",
  "ykk_sample_count",
  "saa_id",
  "saa_shape_count",
  "saa_sample_count",
  "sab_id",
  "sab_shape_count",
  "sab_sample_count",
  "wks_id",
  "wks_shape_count",
  "wks_sample_count",
  "wke_id",
  "wke_shape_count",
  "wke_sample_count",
  "sgs_id",
  "sgs_shape_count",
  "sgs_sample_count",
  "sts_id",
  "sts_shape_count",
  "sts_sample_count",
  "kkd_id",
  "kkd_shape_count",
  "kkd_sample_count",
];
export const getEntries = cache(async (): Promise<Entry[]> => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "all_table_v.5.0_2019-01-15.csv"
  );
  const fileContent = await readFile(filePath, "utf-8");

  const entries = parse(fileContent, {
    columns: headers,
    from_line: 3,
    skip_empty_lines: true,
  });

  return entries.slice(0, 100) as Entry[];
});
