module Warmup
    (change
    , stripQuotes
    , firstUppercasedOverLengthFive
    , powers
    , sumOfCubesOfOdds
    , swapAdjacents
    , Shape(Box, Sphere)
    , volume
    , surfaceArea)
    where

import Data.Char

change :: Int -> Either String (Int, Int, Int, Int)
change amount =
    if amount < 0 then
        Left "amount cannot be negative"
    else
        let
            (quarters, afterQuarters) = amount `divMod` 25
            (dimes, afterDimes) = afterQuarters `divMod` 10
            (nickels, pennies) = afterDimes `divMod` 5
        in Right (quarters, dimes, nickels, pennies)

stripQuotes :: String -> String
stripQuotes s = filter (\c -> c /= '\'' && c /= '"') s

firstUppercasedOverLengthFive :: [String] -> Maybe String
firstUppercasedOverLengthFive [] = Nothing
firstUppercasedOverLengthFive (s:strings) = 
    if length s > 5 then
        Just (map toUpper s)        
    else
        firstUppercasedOverLengthFive strings

powers :: Num a => a -> [a]
powers num = map (num^) [0..]

sumOfCubesOfOdds :: [Int] -> Int
sumOfCubesOfOdds [] = 0
sumOfCubesOfOdds (n:nums) = 
    if n `mod` 2 /= 0 then
        n * n * n + sumOfCubesOfOdds nums
    else
        sumOfCubesOfOdds nums

swapAdjacents :: [a] -> [a]
swapAdjacents [] = []
swapAdjacents (a:b:remaining) = b:a:(swapAdjacents remaining)
swapAdjacents [a] = [a]

data Shape 
    = Sphere Double 
    | Box Double Double Double
    deriving (Eq, Show)

volume :: Shape -> Double
volume (Sphere r) = (4 / 3) * pi * r**3
volume (Box l w h) = l * w * h

surfaceArea :: Shape -> Double
surfaceArea (Sphere r) = 4 * pi * r**2
surfaceArea (Box l w h) = 2 * (h * w) + 2 * (h * l) + 2 * (w * l)