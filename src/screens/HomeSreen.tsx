import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Switch,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  categoryId?: string;
}

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [favoriteBtn, setFavoriteBtn] = useState<Record<string, boolean>>({});
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "А-Я"| "Я-А" | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesRes, productsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/categories`),
        fetch(`${API_BASE_URL}/products`),
      ]);

      if (!categoriesRes.ok || !productsRes.ok) {
        throw new Error("Не вдалося завантажити дані");
      }

      const categoriesData = await categoriesRes.json();
      const productsData = await productsRes.json();

      setCategories(categoriesData);
      setProducts(productsData);
    } catch (err: any) {
      console.error(err);
      setError("Помилка підключення до сервера");
    } finally {
      setLoading(false);
    }
  };

  // Фільтрація товарів: за категорією ТА за пошуковим запитом
  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      // Перетворення на String усуває помилки розбіжності типів (String vs Number)
      const matchesCategory = selectedCategoryId
        ? String(product.categoryId) === String(selectedCategoryId)
        : true;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
    if (sortOrder === "asc") {
    return [...result].sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "desc") {
    return [...result].sort((a, b) => b.price - a.price);
  }
   if (sortOrder === "А-Я") {
    return [...result].sort((a, b) => a.title.localeCompare(b.title, "ru"));
  }
  if (sortOrder === "Я-А") {
    return [...result].sort((a, b) => b.title.localeCompare(a.title, "ru"));
  }
  return result;
  }, [products, selectedCategoryId, searchQuery, sortOrder]);

  const theme = {
    bg: isDarkMode ? "#121212" : "#FFFFFF",
    cardBg: isDarkMode ? "#1E1E1E" : "#FAFAFA",
    textPrimary: isDarkMode ? "#FFFFFF" : "#212121",
    textSecondary: isDarkMode ? "#A0A0A0" : "#757575",
    inputBg: isDarkMode ? "#2C2C2C" : "#F5F5F5",
    border: isDarkMode ? "#2C2C2C" : "#F0F0F0",
    bannerBg: isDarkMode ? "#1B382B" : "#E8F5E9",
    bannerTitle: isDarkMode ? "#A5D6A7" : "#1B5E20",
    bannerSubtitle: isDarkMode ? "#81C784" : "#4CAF50",
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.centerContainer, { backgroundColor: theme.bg }]}
      >
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Завантаження даних...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[styles.centerContainer, { backgroundColor: theme.bg }]}
      >
        <Ionicons name="alert-circle-outline" size={48} color="#D32F2F" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryText}>Спробувати знову</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.bg}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Шапка */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greetingTitle, { color: theme.textPrimary }]}>
              Привет, Руслан, всё чётко 👋
            </Text>
            <Text
              style={[styles.greetingSubtitle, { color: theme.textSecondary }]}
            >
              Раді бачити тебе знову!
            </Text>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.themeToggleContainer}>
              <Ionicons
                name={isDarkMode ? "moon" : "sunny"}
                size={20}
                color={isDarkMode ? "#FFD54F" : "#FFA000"}
              />
              <Switch
                value={isDarkMode}
                onValueChange={(val) => setIsDarkMode(val)}
                trackColor={{ false: "#E0E0E0", true: "#2E7D32" }}
                thumbColor={isDarkMode ? "#FFFFFF" : "#F4F3F4"}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.notificationButton,
                { backgroundColor: theme.inputBg },
              ]}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={theme.textPrimary}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Пошук */}
        <View
          style={[styles.searchContainer, { backgroundColor: theme.inputBg }]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color="#9E9E9E"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Пошук товарів..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: theme.textPrimary }]}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#9E9E9E" />
            </TouchableOpacity>
          )}
        </View>

        {/* Промо-банер */}
        <View style={[styles.banner, { backgroundColor: theme.bannerBg }]}>
          <View style={styles.bannerContent}>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>Знижки до 50%</Text>
            </View>
            <Text style={[styles.bannerTitle, { color: theme.bannerTitle }]}>
              Свіжі продукти{"\n"}для вашого столу
            </Text>
            <Text
              style={[styles.bannerSubtitle, { color: theme.bannerSubtitle }]}
            >
              Овочі, фрукти, молочні продукти та багато іншого
            </Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Перейти</Text>
              <Ionicons name="arrow-forward" size={16} color="#1B5E20" />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3137/3137044.png",
            }}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>

        {/* Секція: Категорії */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Категорії
          </Text>
          {selectedCategoryId && (
            <TouchableOpacity onPress={() => setSelectedCategoryId(null)}>
              <Text style={styles.seeAllText}>Показати всі</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        >
          {/* Кнопка "Всі" */}
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => setSelectedCategoryId(null)}
          >
            <View
              style={[
                styles.categoryIconContainer,
                {
                  backgroundColor:
                    selectedCategoryId === null
                      ? "#2E7D32"
                      : isDarkMode
                        ? "#2C2C2C"
                        : "#E8F5E9",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="apps"
                size={32}
                color={selectedCategoryId === null ? "#FFFFFF" : "#2E7D32"}
              />
            </View>
            <Text
              style={[
                styles.categoryName,
                {
                  color:
                    selectedCategoryId === null ? "#2E7D32" : theme.textPrimary,
                  fontWeight: selectedCategoryId === null ? "bold" : "normal",
                },
              ]}
            >
              Всі
            </Text>
          </TouchableOpacity>

          {/* Список категорій */}
          {categories.map((item) => {
            const isSelected = String(selectedCategoryId) === String(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.categoryCard}
                onPress={() => setSelectedCategoryId(item.id)}
              >
                <View
                  style={[
                    styles.categoryIconContainer,
                    {
                      backgroundColor: isSelected
                        ? "#2E7D32"
                        : isDarkMode
                          ? "#2C2C2C"
                          : item.bgColor,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={32}
                    color={isSelected ? "#FFFFFF" : item.iconColor}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryName,
                    {
                      color: isSelected ? "#2E7D32" : theme.textPrimary,
                      fontWeight: isSelected ? "bold" : "normal",
                    },
                  ]}
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Секція: Товари */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            {selectedCategoryId
              ? categories.find(
                  (c) => String(c.id) === String(selectedCategoryId),
                )?.name || "Товари"
              : "Популярні товари"}
          </Text>
          <Text style={[styles.countText, { color: theme.textSecondary }]}>
            ({filteredProducts.length})
          </Text>
        </View>

        <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterBtn} onPress={()=> setSortOrder("desc")}><Text>Самые дорогие</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn} onPress={()=> setSortOrder("asc")}><Text>Самые дешёвые</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn} onPress={()=> setSortOrder("А-Я")}><Text>От А до Я</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn} onPress={()=> setSortOrder("Я-А")}><Text>От Я до А</Text></TouchableOpacity>
        </View>

        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="basket-outline"
              size={48}
              color={theme.textSecondary}
            />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Товарів у цій категорії поки немає
            </Text>
          </View>
        ) : (
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <View
                key={product.id}
                style={[
                  styles.productCard,
                  { backgroundColor: theme.cardBg, borderColor: theme.border },
                ]}
              >
                <TouchableOpacity style={styles.favoriteButton} onPress={()=>setFavoriteBtn((prev)=>({
                    ...prev,
                    [product.id]: !prev[product.id],
                }))}>
                  <Ionicons
                    name={favoriteBtn ? "heart" : "heart-outline"}
                    size={20}
                    color={favoriteBtn[product.id] ? "red" : "#BDBDBD"}
                    />
                </TouchableOpacity>

                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />

                <Text
                  style={[styles.productTitle, { color: theme.textPrimary }]}
                  numberOfLines={1}
                >
                  {product.title}
                </Text>
                <Text
                  style={[styles.productPrice, { color: theme.textPrimary }]}
                >
                  {product.price}{" "}
                  <Text
                    style={[styles.productUnit, { color: theme.textSecondary }]}
                  >
                    {product.unit}
                  </Text>
                </Text>

                <View style={styles.productFooter}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFB300" />
                    <Text
                      style={[styles.ratingText, { color: theme.textPrimary }]}
                    >
                      {product.rating}{" "}
                      <Text style={styles.reviewsText}>
                        ({product.reviews})
                      </Text>
                    </Text>
                  </View>

                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Додати</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: "#2E7D32",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  greetingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#E53935",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },

  //Filter
  filterContainer:{
    height: 50,
    width:390,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  filterBtn:{
    height: 50,
    width: 70,
    backgroundColor: "lightgreen",
    borderRadius: 13,
    marginLeft: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  // Banner
  banner: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
  },
  discountTag: {
    backgroundColor: "#2E7D32",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 22,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 12,
    marginBottom: 12,
  },
  bannerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  bannerButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1B5E20",
    marginRight: 4,
  },
  bannerImage: {
    width: 110,
    height: 110,
    marginLeft: 8,
  },

  // Sections
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countText: {
    fontSize: 14,
    marginLeft: 6,
  },
  seeAllText: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "600",
  },

  // Categories
  categoriesList: {
    paddingBottom: 16,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 16,
    width: 72,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
  },

  // Empty State
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
  },

  // Products Grid
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  productCard: {
    width: "48%",
    borderRadius: 16,
    padding: 12,
    position: "relative",
    borderWidth: 1,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1, 
  },
  productImage: {
    width: "100%",
    height: 90,
    marginVertical: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productUnit: {
    fontSize: 12,
    fontWeight: "normal",
  },
  productFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 2,
  },
  reviewsText: {
    fontSize: 11,
    color: "#9E9E9E",
    fontWeight: "normal",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E7D32",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
});

 