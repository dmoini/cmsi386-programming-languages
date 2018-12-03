module Warmup
    (change
    , stripQuotes
    , firstUppercasedOverLengthFive
    , powers
    , sumOfCubesOfOdds
    , swapAdjacents)
    where
        -- ^^^ TODO: add to module data type for 3-D shapes

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

-- A function that returns the uppercased version of the fist string 
-- in a list that has a length greater than 5, wrapped in a Maybe, 
-- since there might not be any strings greater than 5 in the list.
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

-- TODO
swapAdjacents list = 0