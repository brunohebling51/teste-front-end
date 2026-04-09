import { useState, useEffect, useRef } from "react";
import "./main.scss";
import instagramIcon from "/src/assets/icons/instagram.png";
import facebookIcon from "/src/assets/icons/facebook.png";
import linkedinIcon from "/src/assets/icons/linkedin.png";
import shieldIcon from "/src/assets/icons/ShieldCheck.png";
import truckIcon from "/src/assets/icons/Truck.png";
import creditCardIcon from "/src/assets/icons/CreditCard.png";
import crownIcon from "/src/assets/icons/CrownSimple.png";
import groupIcon from "/src/assets/icons/Group.png";
import cartIcon from "/src/assets/icons/ShoppingCart.png";
import userIcon from "/src/assets/icons/UserCircle.png";
import heartIcon from "/src/assets/icons/Heart.png";

// ─────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  price: string;
  photo: string;
  installments: string;
  freeShipping: boolean;
  image: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Brand {
  id: number;
  name: string;
}

interface BannerData {
  id: number;
  title: string;
  description: string;
  image: string;
}

// ─────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────

const NAV_LINKS = [
  "Todas Categorias",
  "Supermercado",
  "Livros",
  "Moda",
  "Lançamentos",
  "Ofertas do dia",
];

const CATEGORIES: Category[] = [
  { id: 1, name: "Tecnologia", image: "/src/assets/tecnologia.png" },
  { id: 2, name: "Supermercado", image: "/src/assets/mercado.png" },
  { id: 3, name: "Bebidas", image: "/src/assets/bebidas.png" },
  { id: 4, name: "Ferramentas", image: "/src/assets/ferramentas.png" },
  { id: 5, name: "Saúde", image: "/src/assets/saude.png" },
  { id: 6, name: "Esportes e Fitness", image: "/src/assets/corrida.png" },
  { id: 7, name: "Moda", image: "/src/assets/moda.png" },
];

const PRODUCT_TABS = [
  "Celular",
  "Acessórios",
  "Tablets",
  "Notebooks",
  "TVs",
  "Ver todos",
];


const BRANDS: Brand[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: "converse",
}));

const BANNERS: BannerData[] = [
  {
    id: 1,
    title: "Parceiros",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos laudantium officia omnis repellat repudiandae pariatur aperiam at quo? A dolore maiores voluptate nostrum soluta sapiente eaque blanditiis culpa asperiores eos.",
    image: "/assets/banner.jpg",
  },
  {
    id: 2,
    title: "Parceiros",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos laudantium officia omnis repellat repudiandae pariatur aperiam at quo? A dolore maiores voluptate nostrum soluta sapiente eaque blanditiis culpa asperiores eos.",
    image: "/assets/banner.jpg",
  },
];
// ─────────────────────────────────────────
//  SUB-COMPONENTS
// ─────────────────────────────────────────

function Logo() {
  return (
    <img
      src="/src/assets/econverse.webp"
      alt="Logo Econverse"
      style={{
        height: 100,
        maxHeight: "100%",
        objectFit: "contain",
        cursor: "pointer",
      }}
    />
  );
}

interface ProductCardProps {
  product: Product;
  onBuy: () => void;
}

function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <div className="product-card" onClick={onBuy}>

      <div className="product-card__image">
        <img src={product.photo} alt={product.name} />
      </div>

      <p className="product-card__name">
        {product.name}
      </p>

      <p className="product-card__old-price">
        {product.price}
      </p>

      <p className="product-card__price">
        {product.price}
      </p>

      <p className="product-card__installments">
        {product.installments}
      </p>

      {product.freeShipping && (
        <p className="product-card__shipping">
          Frete grátis
        </p>
      )}

      <button
        className="product-card__button"
        onClick={(e) => {
          e.stopPropagation();
          onBuy();
        }}
      >
        Comprar
      </button>

    </div>
  );
}
interface SectionTitleProps {
  title: string;
  showViewAll?: boolean;
}

function SectionTitle({ title, showViewAll = true }: SectionTitleProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: 24 }}>
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#3442B5",
          display: "inline-block",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "calc(-200px - 24px)",
            top: "50%",
            width: 200,
            height: 1,
            background: "#ddd",
          }}
        />
        {title}
        <span
          style={{
            position: "absolute",
            right: "calc(-200px - 24px)",
            top: "50%",
            width: 200,
            height: 1,
            background: "#ddd",
          }}
        />
      </h2>
    </div>
  );
}

interface ProductShowcaseProps {
  onBuy: (product: any) => void;
}

function ProductShowcase({ onBuy }: ProductShowcaseProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.allorigins.win/raw?url=https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: 40 }}>Carregando produtos...</p>;
  }

  return (
    <div className="product-showcase">
      <SectionTitle title="Produtos relacionados" />

      {/* Tabs */}
      <div className="product-showcase__tabs">
        {PRODUCT_TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`product-showcase__tab ${activeTab === i ? "product-showcase__tab--active" : ""
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="product-showcase__carousel-wrapper">

        <button
          onClick={scrollLeft}
          className="product-showcase__arrow product-showcase__arrow--left"
        >
          ‹
        </button>

        <button
          onClick={scrollRight}
          className="product-showcase__arrow product-showcase__arrow--right"
        >
          ›
        </button>

        <div ref={carouselRef} className="product-showcase__carousel">
          {produtos.map((product, index) => (
            <ProductCard
              key={index}
              product={{
                id: index,
                name: product.productName,
                price: `R$ ${product.price}`,
                installments: "ou 2x de R$ 49,95 sem juros",
                freeShipping: true,
                category: "api",
                photo: product.photo,
              }}
              onBuy={() => onBuy(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface BannerSectionProps {
  banners: BannerData[];
}

function BannerSection({ banners }: BannerSectionProps) {
  return (
    <div className="banner-section">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="banner-section__item"
          style={{
            backgroundImage: "url('/src/assets/banner.jpg')",
          }}
        >
          <div className="banner-section__overlay" />

          <div className="banner-section__content">
            <h3 className="banner-section__title">
              {banner.title}
            </h3>

            <p className="banner-section__description">
              {banner.description}
            </p>

            <button className="banner-section__button">
              CONFIRA
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen || !product) return null;

  const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const changeQty = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div
      onClick={handleBgClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 12,
          padding: 40,
          maxWidth: 800,
          width: "90%",
          display: "flex",
          gap: 32,
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "#444",
          }}
        >
          ✕
        </button>

        <div
          style={{
            width: 260,
            height: 200,
            borderRadius: 8,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
          }}
        >
          <img
            src={product?.photo}
            alt={product?.productName}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#000000",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 16,
            }}
          >
            {product?.productName}
          </h3>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#000000", marginBottom: 16, fontFamily: "Poppins, sans-serif" }}>
            {product?.price?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p style={{ fontSize: 13, color: "#9f9f9f", lineHeight: 1.6, marginBottom: 8 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos laudantium officia omnis repellat repudiandae pariatur aperiam at quo? A dolore maiores voluptate nostrum soluta sapiente eaque blanditiis culpa asperiores eos.
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#3019b2",
              cursor: "pointer",
              marginBottom: 24,
            }}
          >
            Veja mais detalhes do produto &gt;
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#f5f5f5",
                borderRadius: 8,
                padding: "8px 16px",
              }}
            >
              <button
                onClick={() => changeQty(-1)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer",
                  color: "#444",
                  fontWeight: 700,
                }}
              >
                −
              </button>
              <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: "center" }}>
                {quantity < 10 ? `0${quantity}` : quantity}
              </span>
              <button
                onClick={() => changeQty(1)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer",
                  color: "#444",
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </div>
            <button
              style={{
                flex: 1,
                padding: "10px 0",
                background: "#F7CA11",
                color: "black",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function EconversePage() {
  const [activeNav, setActiveNav] = useState<string>("Ofertas do dia");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const socialIcons = [
    { src: instagramIcon, alt: "Instagram" },
    { src: facebookIcon, alt: "Facebook" },
    { src: linkedinIcon, alt: "LinkedIn" },
  ];

  const icons = [
    { src: groupIcon, alt: "Grupo" },
    { src: cartIcon, alt: "Carrinho" },
    { src: userIcon, alt: "Usuário" },
    { src: heartIcon, alt: "Favoritos" },
  ];


  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "#F8F8F8", color: "#333" }}>

      {/* ── TOP BAR ── */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #eee",
          padding: "6px 80px",
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {[
          {
            icon: shieldIcon,
            text: (
              <>
                <span style={{ color: "#3442B5", fontWeight: 600 }}>
                  100% segura
                </span>
              </>
            ),
            prefix: "Compra ",
          },
          {
            icon: truckIcon,
            text: (
              <>
                <span style={{ color: "#3442B5", fontWeight: 600 }}>
                  Frete grátis
                </span>{" "}
                acima de R$ 200
              </>
            ),
            prefix: "",
          },
          {
            icon: creditCardIcon,
            text: (
              <>
                <span style={{ color: "#3442B5", fontWeight: 600 }}>
                  Parcele
                </span>{" "}
                suas compras
              </>
            ),
            prefix: "",
          },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#9f9f9f" }}>
            <img
              src={item.icon}
              alt="icon"
              style={{ width: 16, height: 16, objectFit: "contain" }}
            />            {item.prefix && <span>{item.prefix}</span>}
            {item.text}
          </div>
        ))}
      </div>

      {/* ── MAIN HEADER ── */}
      <div
        style={{
          background: "white",
          padding: "12px 80px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
        }}
      >
        {/* ESQUERDA - LOGO */}
        <div style={{ width: 200 }}>
          <Logo />
        </div>

        {/* CENTRO - BUSCA */}
        {/* <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 430, position: "relative" }}>
            <input
              placeholder="O que você está buscando?"
              style={{
                width: "100%",
                padding: "12px 48px 12px 16px",
                borderRadius: 10,
                background: "#F6F5F2",
                border: "none",
                fontSize: 14,
                color: "#9f9f9f",
                fontFamily: "Poppins, sans-serif",
                outline: "none",
              }}
            />
          </div>
        </div> */}
        <div className="search">
          <div className="search__wrapper">
            <input
              className="search__input"
              placeholder="O que você está buscando?"
            />
          </div>
        </div>

        <div
          style={{
            width: 200,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 16,
          }}
        >
          {icons.map((icon, i) => (
            <div
              key={i}
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={icon.src}
                alt={icon.alt}
                style={{ width: 24, height: 24, objectFit: "contain" }}
              />
            </div>
          ))}        </div>
      </div>

      {/* ── NAV ── */}
      <div
        style={{
          background: "white",
          boxShadow: "0 8px 16px rgba(57,48,19,0.12)",
          padding: "10px 80px",
          display: "flex",
          alignItems: "center",
          gap: 56,
          justifyContent: "center",
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            onClick={() => setActiveNav(link)}
            href="#"
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              color: activeNav === link ? "#3019b2" : "#9f9f9f",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#9f9f9f",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <img
            src={crownIcon}
            alt="Assinatura"
            style={{ width: 16, height: 16 }}
          />
          Assinatura
        </a>      </div>

      {/* ── BANNER PRINCIPAL ── */}
      <div
        style={{
          backgroundImage: "url('/src/assets/fundo-topo.jpg')",
          minHeight: 390,
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 560, zIndex: 2 }}>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "white", lineHeight: 1.15, marginBottom: 12 }}>
            Venha conhecer nossas promoções
          </h1>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 28 }}>
            <span style={{ color: "#F7CA11" }}>50% OFF</span>{" "}
            <span style={{ color: "white" }}>nos produtos</span>
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              background: "#F7CA11",
              color: "black",
              padding: "12px 32px",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Ver produto
          </button>
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <div style={{ padding: "40px 80px" }}>
        <div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer" }}
            >
              <div
                style={{
                  width: 128,
                  height: 128,
                  background: "#F6F5F2",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: 61, height: 61, objectFit: "contain" }}
                />
              </div>
              <span style={{ fontSize: 14, color: "#444", fontWeight: 500, textAlign: "center" }}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── VITRINE 1 ── */}
      <ProductShowcase
        onBuy={(product) => {
          setSelectedProduct(product);
          setModalOpen(true);
        }}
      />

      {/* ── BANNERS 1 ── */}
      <BannerSection banners={BANNERS} />

      {/* ── VITRINE 2 ── */}
      <ProductShowcase
        onBuy={(product) => {
          setSelectedProduct(product);
          setModalOpen(true);
        }}
      />

      {/* ── BANNERS 2 ── */}
      <BannerSection banners={BANNERS} />

      {/* ── BRANDS ── */}
      <div style={{ padding: "40px 80px" }}>
        <SectionTitle title="Navegue por marcas" showViewAll={false} />
        <div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              style={{
                width: 211,
                height: 211,
                background: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              <img
                src="/src/assets/econverse.webp"
                alt={brand.name}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── VITRINE 3 ── */}
      <ProductShowcase
        onBuy={(product) => {
          setSelectedProduct(product);
          setModalOpen(true);
        }}
      />

      {/* ── NEWSLETTER ── */}
      <div
        style={{
          background: "#271C47",
          padding: "40px 80px",
          display: "flex",
          alignItems: "center",
          gap: 80,
        }}
      >
        <div>
          <h3 style={{ fontSize: 26, fontWeight: 700, color: "white", marginBottom: 8 }}>
            Inscreva-se na nossa newsletter
          </h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", maxWidth: 400, lineHeight: 1.6 }}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>
        <div style={{ display: "flex", gap: 16, flex: 1, flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <input
              placeholder="Digite seu nome"
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                fontFamily: "Poppins, sans-serif",
                outline: "none",
              }}
            />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                fontFamily: "Poppins, sans-serif",
                outline: "none",
              }}
            />
            <button
              style={{
                padding: "10px 24px",
                background: "#F7CA11",
                color: "#271C47",
                border: "none",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
                cursor: "pointer",
                fontFamily: "Poppins, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              INSCREVER
            </button>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>
            <input type="checkbox" style={{ accentColor: "#F7CA11", width: 15, height: 15 }} />
            Aceito os termos e condições
          </label>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer__top">

          <div className="footer__left">
            <Logo />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, minima!
            </p>

            <div className="footer__social">
              {socialIcons.map((icon, i) => (
                <div key={i}>
                  <img src={icon.src} alt={icon.alt} />
                </div>
              ))}
            </div>
          </div>

          <div className="footer__divider" />

          <div className="footer__columns">
            {[
              { title: "Institucional", links: ["Sobre Nós", "Movimento", "Trabalhe conosco"] },
              { title: "Ajuda", links: ["Suporte", "Fale Conosco", "Perguntas Frequentes"] },
              { title: "Termos", links: ["Termos e Condições", "Política de Privacidade", "Troca e Devolução"] },
            ].map((col) => (
              <div key={col.title} className="footer__column">
                <h4>{col.title}</h4>

                {col.links.map((link) => (
                  <a key={link} href="#">
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

        </div>

        <p className="footer__bottom">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, at.
        </p>
      </footer>
      {/* ── MODAL ── */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
