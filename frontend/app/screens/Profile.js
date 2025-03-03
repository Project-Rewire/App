import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-gradient-to-b from-blue-200 to-indigo-500">
      <Card className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl">
        <CardContent className="items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              className="w-28 h-28 rounded-full border-4 border-indigo-400 shadow-md"
            />
          </motion.div>
          <Text className="text-2xl font-extrabold text-gray-900">John Doe</Text>
          <Text className="text-gray-600 text-sm">johndoe@example.com</Text>
          <Text className="text-center text-gray-700 mt-3 px-4">
            Passionate about tech and design. Love to explore new trends and innovations.
          </Text>
          <View className="flex-row mt-6 space-x-3">
            <Button className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow-md transition-transform transform active:scale-95">
              Edit Profile
            </Button>
            <Button className="px-5 py-3 bg-red-600 text-white rounded-xl shadow-md transition-transform transform active:scale-95">
              Logout
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
