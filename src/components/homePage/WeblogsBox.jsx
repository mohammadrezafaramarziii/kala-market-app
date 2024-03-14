import WeblogCard from "../WeblogCard"

export default function WeblogsBox({ title, etitle }) {
    const weblogs = [
        {
            pic: "/images/weblog-1.png",
            title: "بررسی ساعت میبرو GS Pro؛ یک ارتقای جذاب",
            description: " لورم ایپسوم متن از چاپ و با استفادهلورم ایپسوم متن ساختگی با تولید با تولید سادگی نامفهوم از صنعت چاپ و با استفاده",
            readTime: "4",
            category: "تکنولوژی",
            auther: "محمدرضا فرامرزی"
        },
        {
            pic: "/images/weblog-2.png",
            title: "راهنمای خرید بهترین گوشی گیمینگ تا ۱۰ میلیون تومان",
            description: " لورم ایپسوم متن از چاپ و با استفادهلورم ایپسوم متن ساختگی با تولید با تولید سادگی نامفهوم از صنعت چاپ و با استفاده",
            readTime: "10",
            category: "تکنولوژی",
            auther: "محمدرضا فرامرزی"
        },
        {
            pic: "/images/weblog-3.png",
            title: "بررسی لپ‌تاپ ایسوس Vivobook 16؛ لپ‌تاپ دانشجویی جذاب",
            description: " لورم ایپسوم متن از چاپ و با استفادهلورم ایپسوم متن ساختگی با تولید با تولید سادگی نامفهوم از صنعت چاپ و با استفاده",
            readTime: "6",
            category: "تکنولوژی",
            auther: "محمدرضا فرامرزی"
        },
        {
            pic: "/images/weblog-4.png",
            title: "بررسی مانیتور نکسار NDM-22VN؛ اقتصادی و بهتر از انتظار",
            description: " لورم ایپسوم متن از چاپ و با استفادهلورم ایپسوم متن ساختگی با تولید با تولید سادگی نامفهوم از صنعت چاپ و با استفاده",
            readTime: "12",
            category: "تکنولوژی",
            auther: "محمدرضا فرامرزی"
        },
    ]

    return (
        <div>

            <div className="w-full px-6 mb-6">
                <div className="w-full flex items-end justify-between">
                    <div className="flex items-start gap-2">
                        <div className="w-1.5 h-[36px] sm:h-12 bg-primary-900 rounded-full"></div>
                        <div className="flex flex-col border-r6 border-primary-900 pr3">
                            <div className="text-xs sm:text-sm text-secondary-300 font-semibold">
                                {etitle}
                            </div>
                            <div className="text-secondary-900 text-sm sm:text-lg font-semibold">
                                {title}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 min-[430px]:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
                {weblogs.map((weblog, index) => {
                    return (
                        <WeblogCard key={index} weblog={weblog} />
                    )
                })}
            </div>
        </div>
    )
}
