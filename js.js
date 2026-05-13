
        const { createApp, ref, computed, onMounted, nextTick } = Vue;

        createApp({
            setup() {
                // ===== STATE =====
                const isLoading = ref(true);
                const navScrolled = ref(false);
                const mobileMenuOpen = ref(false);
                const searchQuery = ref('');
                const activeCategory = ref('all');
                const modalOpen = ref(false);
                const selectedItem = ref(null);
                const toastVisible = ref(false);
                const toastMessage = ref('');

                // ===== CATEGORIES =====
                const categories = ref([
                    { id: 'all', name: 'الكل', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>' },
                    { id: 'main', name: 'الأطباق الرئيسية', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' },
                    { id: 'grills', name: 'المشويات', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>' },
                    { id: 'appetizers', name: 'المقبلات', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
                    { id: 'seafood', name: 'المأكولات البحرية', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 16s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4zM14 8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/></svg>' },
                    { id: 'pasta', name: 'المعكرونة', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 16c0-4 4-8 8-8s8 4 8 8"/></svg>' },
                ]);

                // ===== MENU ITEMS =====
                const menuItems = ref([
                    {
                        id: 1, name: 'كبسة لحم الضأن', category: 'الأطباق الرئيسية', categoryEn: 'main',
                        description: 'أرز بسمتي فاخر مع لحم الضأن الطري والبهارات العربية الأصيلة',
                        fullDescription: 'كبسة لحم الضأن المُعدّة بعناية فائقة مع أجود أنواع الأرز البسمتي الهندي، متبّلة بخلطة خاصة من البهارات العربية تشمل الهيل والقرفة والزعفران، مقدّمة مع اللحم الطري والمكسرات المحمّصة',
                        price: '89', rating: '4.9', badge: 'الأكثر طلباً',
                        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop',
                        prepTime: '35 دقيقة', calories: '650 سعرة'
                    },
                    {
                        id: 2, name: 'مشاوي مشكّلة ملكية', category: 'المشويات', categoryEn: 'grills',
                        description: 'تشكيلة فاخرة من اللحوم المشوية على الفحم مع الصلصات الخاصة',
                        fullDescription: 'تشكيلة ملكية من أجود أنواع اللحوم المشوية على الفحم الطبيعي، تشمل ريش الغنم وكباب اللحم وشيش طاووق، مقدّمة مع صلصة الطحينة والثوم والخضروات المشوية',
                        price: '120', rating: '4.8', badge: 'اختيار الشيف',
                        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop',
                        prepTime: '45 دقيقة', calories: '800 سعرة'
                    },
                    {
                        id: 3, name: 'حمص بالطحينة', category: 'المقبلات', categoryEn: 'appetizers',
                        description: 'حمص كريمي ناعم مع طحينة فاخرة وزيت زيتون بكر',
                        fullDescription: 'حمص مطحون ناعم كالحرير مع طحينة فاخرة مستوردة وزيت زيتون بكر ممتاز، مزيّن بحبات الصنوبر المحمّص والبابريكا المدخّنة',
                        price: '35', rating: '4.7',
                        image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=600&h=400&fit=crop',
                        prepTime: '10 دقائق', calories: '280 سعرة'
                    },
                    {
                        id: 4, name: 'سمك الهامور المشوي', category: 'المأكولات البحرية', categoryEn: 'seafood',
                        description: 'سمك هامور طازج مشوي مع الأعشاب والليمون',
                        fullDescription: 'سمك هامور طازج من أجود الأسماك، مشوي بعناية مع خلطة خاصة من الأعشاب الطازجة والليمون وزيت الزيتون، مقدّم مع أرز بالزعفران والخضروات الموسمية',
                        price: '110', rating: '4.9', badge: 'طازج يومياً',
                        image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&h=400&fit=crop',
                        prepTime: '30 دقيقة', calories: '450 سعرة'
                    },
                    {
                        id: 5, name: 'باستا ألفريدو', category: 'المعكرونة', categoryEn: 'pasta',
                        description: 'باستا طازجة مع صلصة الألفريدو الكريمية والدجاج',
                        fullDescription: 'باستا طازجة محضّرة يدوياً مع صلصة ألفريدو كريمية غنية بالبارميزان وقطع الدجاج المشوية، مزيّنة بالريحان الطازج والفلفل الأسود',
                        price: '65', rating: '4.6',
                        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=400&fit=crop',
                        prepTime: '25 دقيقة', calories: '580 سعرة'
                    },
                    {
                        id: 6, name: 'منسف أردني', category: 'الأطباق الرئيسية', categoryEn: 'main',
                        description: 'الطبق الأردني التقليدي مع لحم الغنم والجميد',
                        fullDescription: 'منسف أردني أصيل محضّر بالطريقة التقليدية مع لحم الغنم الطري والجميد (اللبن المجفّف) والأرز البسمتي، مقدّم على صاج فخاري مع المكسرات',
                        price: '95', rating: '4.9', badge: 'تراثي',
                        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
                        prepTime: '50 دقيقة', calories: '720 سعرة'
                    },
                    {
                        id: 7, name: 'تبولة لبنانية', category: 'المقبلات', categoryEn: 'appetizers',
                        description: 'سلطة تبولة طازجة مع البقدونس والبرغل والليمون',
                        fullDescription: 'تبولة لبنانية أصيلة محضّرة من البقدونس الطازج المفروم ناعماً مع البرغل المسلوق والطماطم والنعناع وعصير الليمون الطازج وزيت الزيتون',
                        price: '30', rating: '4.5',
                        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
                        prepTime: '15 دقيقة', calories: '180 سعرة'
                    },
                    {
                        id: 8, name: 'ريش غنم مشوية', category: 'المشويات', categoryEn: 'grills',
                        description: 'ريش غنم طرية مشوية على الفحم مع إكليل الجبل',
                        fullDescription: 'ريش غنم طرية متبّلة بخلطة سرية من الأعشاب والتوابل، مشوية ببطء على الفحم الطبيعي مع إكليل الجبل والثوم، مقدّمة مع البطاطس المشوية',
                        price: '135', rating: '4.9', badge: 'مميز',
                        image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=600&h=400&fit=crop',
                        prepTime: '40 دقيقة', calories: '750 سعرة'
                    },
                ]);

                // ===== FEATURED ITEMS =====
                const featuredItems = ref([
                    {
                        id: 101, name: 'طاجن لحم بالبرقوق', description: 'لحم بقري طري مطهو ببطء مع البرقوق المجفّف واللوز والعسل في طاجن مغربي أصيل',
                        price: '105', rating: '4.9',
                        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop'
                    },
                    {
                        id: 102, name: 'سلطة فتوش', description: 'سلطة فتوش لبنانية مع الخبز المحمّص والسماق والرمان والخضروات الطازجة',
                        price: '40', rating: '4.7',
                        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop'
                    },
                    {
                        id: 103, name: 'كنافة نابلسية', description: 'كنافة نابلسية بالجبنة مع القطر والفستق الحلبي المحمّص',
                        price: '45', rating: '4.8',
                        image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&h=400&fit=crop'
                    },
                    {
                        id: 104, name: 'شاورما دجاج', description: 'شاورما دجاج متبّلة بخلطة خاصة مع الثومية والمخللات في خبز صاج',
                        price: '38', rating: '4.6',
                        image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop'
                    },
                ]);

                // ===== DRINKS =====
                const drinks = ref([
                    { id: 201, name: 'قهوة عربية بالهيل', description: 'قهوة عربية أصيلة محضّرة مع الهيل والزعفران والتمر', price: '25', image: 'https://images.unsplash.com/photo-1578899544667-021d8d751534?w=400&h=400&fit=crop' },
                    { id: 202, name: 'عصير رمان طازج', description: 'عصير رمان طبيعي 100% مع النعناع الطازج', price: '30', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=400&fit=crop' },
                    { id: 203, name: 'شاي مغربي بالنعناع', description: 'شاي أخضر مغربي مع النعناع الطازج والصنوبر', price: '22', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=400&fit=crop' },
                    { id: 204, name: 'ليموناضة بالزنجبيل', description: 'ليموناضة منعشة مع الزنجبيل الطازج والنعناع', price: '28', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&h=400&fit=crop' },
                    { id: 205, name: 'لبن عيران', description: 'لبن عيران بارد ومنعش مع النعناع والخيار', price: '18', image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&h=400&fit=crop' },
                    { id: 206, name: 'موهيتو فراولة', description: 'موهيتو منعش بالفراولة الطازجة والليمون والنعناع', price: '35', image: 'https://images.unsplash.com/photo-1546171753-97d7676e6123?w=400&h=400&fit=crop' },
                ]);

                // ===== DESSERTS =====
                const desserts = ref([
                    {
                        id: 301, name: 'أم علي', category: 'الحلويات',
                        description: 'حلوى أم علي المصرية بالمكسرات والقشطة والعسل',
                        price: '40', rating: '4.8', badge: 'كلاسيكي',
                        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
                        fullDescription: 'أم علي المصرية الأصيلة محضّرة من عجينة البف باستري المقرمشة مع الحليب والقشطة والمكسرات المحمّصة والزبيب والعسل الطبيعي',
                        prepTime: '20 دقيقة', calories: '420 سعرة'
                    },
                    {
                        id: 302, name: 'بقلاوة فستق', category: 'الحلويات',
                        description: 'بقلاوة تركية بالفستق الحلبي مع القطر والزبدة',
                        price: '45', rating: '4.9', badge: 'الأكثر مبيعاً',
                        image: 'https://images.unsplash.com/photo-1519676867240-f03562e64571?w=600&h=400&fit=crop',
                        fullDescription: 'بقلاوة تركية فاخرة محضّرة من طبقات رقيقة من العجين الفيلو مع الفستق الحلبي المطحون والزبدة الطازجة والقطر المعطّر بماء الورد',
                        prepTime: '45 دقيقة', calories: '380 سعرة'
                    },
                    {
                        id: 303, name: 'كريم بروليه', category: 'الحلويات',
                        description: 'كريم بروليه فرنسي كلاسيكي مع الفانيليا الطبيعية',
                        price: '50', rating: '4.7',
                        image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&h=400&fit=crop',
                        fullDescription: 'كريم بروليه فرنسي أصيل محضّر من الكريمة الطازجة والفانيليا الطبيعية من مدغشقر، مع طبقة الكراميل المحمّصة المقرمشة',
                        prepTime: '30 دقيقة', calories: '350 سعرة'
                    },
                ]);

                // ===== OFFERS =====
                const offers = ref([
                    {
                        id: 401, name: 'باقة العائلة الكبيرة', tag: 'الأكثر طلباً',
                        originalPrice: '450', price: '320',
                        items: ['كبسة لحم كبيرة', 'مشاوي مشكّلة', 'حمص بالطحينة', 'تبولة', 'أرز بالزعفران', 'عصير طازج للعائلة']
                    },
                    {
                        id: 402, name: 'باقة رومانسية لشخصين', tag: 'رومانسي',
                        originalPrice: '350', price: '250',
                        items: ['ريش غنم مشوية', 'سلطة سيزر', 'خبز طازج', 'حلوى فاخرة', 'شموع وورود']
                    },
                    {
                        id: 403, name: 'باقة الغداء السريع', tag: 'اقتصادي',
                        originalPrice: '180', price: '120',
                        items: ['شاورما دجاج', 'بطاطس مقلية', 'عصير طازج', 'حلوى صغيرة']
                    },
                ]);

                // ===== COMPUTED =====
                const filteredItems = computed(() => {
                    let items = menuItems.value;

                    if (activeCategory.value !== 'all') {
                        items = items.filter(item => item.categoryEn === activeCategory.value);
                    }

                    if (searchQuery.value) {
                        const query = searchQuery.value.toLowerCase();
                        items = items.filter(item =>
                            item.name.toLowerCase().includes(query) ||
                            item.description.toLowerCase().includes(query) ||
                            item.category.toLowerCase().includes(query)
                        );
                    }

                    return items;
                });

                // ===== METHODS =====
                const filterByCategory = (catId) => {
                    activeCategory.value = catId;
                };

                const filterItems = () => {
                    // reactive filtering happens via computed
                };

                const openModal = (item) => {
                    selectedItem.value = item;
                    modalOpen.value = true;
                    document.body.style.overflow = 'hidden';
                };

                const closeModal = () => {
                    modalOpen.value = false;
                    document.body.style.overflow = '';
                };

                const addToCart = (item) => {
                    toastMessage.value = `تمت إضافة "${item.name}" إلى الطلب`;
                    toastVisible.value = true;
                    setTimeout(() => {
                        toastVisible.value = false;
                    }, 3000);
                };

                const scrollToSection = (id) => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                };

                // ===== LIFECYCLE =====
                onMounted(() => {
                    // Loading screen
                    setTimeout(() => {
                        isLoading.value = false;
                        initAnimations();
                    }, 3000);

                    // Navbar scroll
                    window.addEventListener('scroll', () => {
                        navScrolled.value = window.scrollY > 50;
                    });

                    // Initialize Swiper
                    nextTick(() => {
                        new Swiper('.featuredSwiper', {
                            loop: true,
                            spaceBetween: 30,
                            slidesPerView: 1,
                            breakpoints: {
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 }
                            },
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                            },
                            autoplay: {
                                delay: 4000,
                                disableOnInteraction: false,
                            },
                            speed: 800,
                            effect: 'slide',
                        });
                    });

                    // Initialize AOS
                    AOS.init({
                        duration: 800,
                        easing: 'ease-out-cubic',
                        once: true,
                        mirror: true
                    });
                });

                const initAnimations = () => {
                    // GSAP animations
                    gsap.registerEffect({
                        name: 'fadeSlideUp',
                        effect: (targets, config) => {
                            return gsap.from(targets, {
                                y: 60,
                                opacity: 0,
                                duration: 0.8,
                                stagger: 0.15,
                                ease: 'power3.out',
                                ...config
                            });
                        }
                    });
                };

                return {
                    isLoading,
                    navScrolled,
                    mobileMenuOpen,
                    searchQuery,
                    activeCategory,
                    categories,
                    menuItems,
                    filteredItems,
                    featuredItems,
                    drinks,
                    desserts,
                    offers,
                    modalOpen,
                    selectedItem,
                    toastVisible,
                    toastMessage,
                    filterByCategory,
                    filterItems,
                    openModal,
                    closeModal,
                    addToCart,
                    scrollToSection
                };
            }
        }).mount('#app');
    