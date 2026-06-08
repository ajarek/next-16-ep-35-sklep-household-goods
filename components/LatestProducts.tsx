"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { products, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Custom helper to format price in Polish Zloty
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function LatestProducts() {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="w-full bg-background py-20 px-6 sm:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 border-b border-border pb-6">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.25em] font-semibold uppercase text-primary mb-2 block select-none">
              Nowa Kolekcja
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.15] select-none">
              Najnowsze Produkty
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground/80 hover:text-primary transition-all duration-300"
          >
            Zobacz Wszystkie
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => {
            const isWishlisted = !!wishlist[product.id];
            return (
              <div
                key={product.id}
                className="group flex flex-col h-full cursor-pointer"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/40 mb-4 shadow-2xs group-hover:shadow-xs transition-shadow duration-500">
                  {/* Badge */}
                  {product.tag && (
                    <span className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-[0.15em] py-1 px-3.5 select-none shadow-sm">
                      {product.tag === "featured" ? "Polecany" : "Nowość"}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background border border-border/20 backdrop-blur-md text-foreground rounded-full p-2.5 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 group/heart cursor-pointer"
                    aria-label="Dodaj do ulubionych"
                  >
                    <Heart
                      size={15}
                      strokeWidth={1.5}
                      className={cn(
                        "transition-all duration-300",
                        isWishlisted
                          ? "fill-red-500 stroke-red-500 scale-110"
                          : "text-foreground/70 group-hover/heart:text-primary group-hover/heart:scale-105"
                      )}
                    />
                  </button>

                  {/* Product Image */}
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Hover Button Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <button
                      className="bg-card text-card-foreground hover:bg-muted text-[10px] tracking-widest font-semibold uppercase py-3 px-6 shadow-md border border-border hover:border-foreground/20 transition-all duration-300 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500"
                    >
                      Zobacz Szczegóły
                    </button>
                  </div>
                </div>

                {/* Info Container */}
                <div className="flex flex-col flex-grow">
                  {/* Category */}
                  <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-primary/70 mb-1">
                    {product.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-lg text-foreground font-normal mb-1.5 transition-colors duration-300 group-hover:text-primary line-clamp-1">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs font-light text-muted-foreground/80 leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Footer Row */}
                  <div className="flex items-baseline justify-between pt-3 border-t border-border/60 mt-auto">
                    <span className="text-sm font-semibold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-light tracking-wide italic">
                      {product.details}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
