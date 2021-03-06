import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Map;
import java.util.TreeMap;
import java.util.HashMap;
import java.util.regex.Pattern;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Comparator;

public class StreamPractice {

    static Pattern nonWord = Pattern.compile("[^\\p{L}']+");

    public static Map<Integer, Long> wordCountByLength(BufferedReader reader) {
        // Return a tree map whose keys are word lengths
        // and corresponding values are the number of words
        // in the reader with that length.

        return reader.lines()
            .flatMap(line -> nonWord.splitAsStream(line.toLowerCase()))
            .filter(word -> !word.isEmpty())
            .collect(Collectors.groupingBy(w->w.length(), TreeMap::new, Collectors.counting()));
    }

    public static class Batter {
        String name;
        String team;
        int atBats;
        int hits;
        double average;
        Batter(String line) {
            String[] components = line.split("\\s*,\\s*");
            this.name = components[0];
            this.team = components[1];
            this.atBats = Integer.parseInt(components[2]);
            this.hits = Integer.parseInt(components[3]);
            this.average = (double)this.hits / (double)this.atBats;
        }

        @Override public String toString() {
          return this.name + " " + this.average;
        }
    }

    public static Map<String, Optional<Batter>> bestBatterByTeam(BufferedReader reader) {
        // Return a map that records, for each team, the b with
        // the highest average over all batters that have at least
        // 100 at-bats.
  
        return reader.lines()
            .map(b -> new Batter(b))
            .filter(a -> a.atBats >= 100)
            .collect(Collectors.groupingBy(b -> b.team, HashMap::new, Collectors.maxBy(Comparator.comparing(b -> b.average))));
    }
}