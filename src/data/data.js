import axios from "axios";

const dataLis = [
  {
    title: "تسجيل الدخول ",
    src: "/login",
    class: "home-li",
  },
  {
    title: "حساب جديد",
    src: "/login",
  },
];
const dataLis2 = [
  {
    title: "الرئيسية",
    src: "/",
    class: "home-li",
  },
  {
    title: "شحن رصيد",
    src: "/profile/",
  },
  {
    title: "محفظتي",
    src: "/profile",
  },
  {
    title: "كورساتي",
    src: "/profile/courses",
  },
  { title: "حسابي", src: "/profile" },
  {
    title: "تسجيل خروج",
    src: "/login",
    async callback() {
      const res = await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });

      console.log(res);
    },
  },
];

const secdata = [
  {
    url: "images/about.png",
    class: "about-us",
    h1: "عن منصنتنا ",
    p: "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة ",
    style: {
      btn: {
        backgroundColor: "#548685",
        color: "white",
      },
      divBox: {
        color: "#548685",
      },
    },
  },
  {
    url: "images/determine.png",
    class: "determine",
    h1: "اخترنا لك الافضل !",
    p: "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة ",
    style: {
      btn: {
        backgroundColor: "#FDD31D",
        color: "white",
      },
      divBox: {
        color: "black",
        order: "1",
      },
      imgBox: {
        justifyContent: "flex-start",
      },
    },
  },
  {
    url: "images/why.png",
    class: "why-us",
    h1: "لماذا نحن ؟",
    p: "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة ",
    style: {
      btn: {
        backgroundColor: "#548685",
        color: "white",
      },
      divBox: {
        color: "#87C8CE",
      },
    },
  },
];
const egyptGovernorates = [
  { id: 1, en: "Cairo", ar: "القاهرة" },
  { id: 2, en: "Alexandria", ar: "الإسكندرية" },
  { id: 3, en: "Giza", ar: "الجيزة" },
  { id: 4, en: "Dakahlia", ar: "الدقهلية" },
  { id: 5, en: "Red Sea", ar: "البحر الأحمر" },
  { id: 6, en: "Beheira", ar: "البحيرة" },
  { id: 7, en: "Fayoum", ar: "الفيوم" },
  { id: 8, en: "Gharbia", ar: "الغربية" },
  { id: 9, en: "Ismailia", ar: "الإسماعيلية" },
  { id: 10, en: "Menofia", ar: "المنوفية" },
  { id: 11, en: "Minya", ar: "المنيا" },
  { id: 12, en: "Qaliubiya", ar: "القليوبية" },
  { id: 13, en: "New Valley", ar: "الوادي الجديد" },
  { id: 14, en: "Suez", ar: "السويس" },
  { id: 15, en: "Aswan", ar: "أسوان" },
  { id: 16, en: "Assiut", ar: "أسيوط" },
  { id: 17, en: "Beni Suef", ar: "بني سويف" },
  { id: 18, en: "Port Said", ar: "بورسعيد" },
  { id: 19, en: "Damietta", ar: "دمياط" },
  { id: 20, en: "Sharkia", ar: "الشرقية" },
  { id: 21, en: "South Sinai", ar: "جنوب سيناء" },
  { id: 22, en: "Kafr El Sheikh", ar: "كفر الشيخ" },
  { id: 23, en: "Matruh", ar: "مطروح" },
  { id: 24, en: "Luxor", ar: "الأقصر" },
  { id: 25, en: "Qena", ar: "قنا" },
  { id: 26, en: "North Sinai", ar: "شمال سيناء" },
  { id: 27, en: "Sohag", ar: "سوهاج" },
];
export { dataLis, secdata, dataLis2, egyptGovernorates };
