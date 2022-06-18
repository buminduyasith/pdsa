// See https://aka.ms/new-console-template for more information
using shortestpsthv2;

Console.WriteLine("Hello, World!");


int V = 4;
/*Graph g = new Graph();*/
int[,] graph =  {
                          { 0, 6, 0, 0, 0, 0, 0, 9, 0 },
                          { 6, 0, 9, 0, 0, 0, 0, 11, 0 },
                          { 0, 9, 0, 5, 0, 6, 0, 0, 2 },
                          { 0, 0, 5, 0, 9, 16, 0, 0, 0 },
                          { 0, 0, 0, 9, 0, 10, 0, 0, 0 },
                          { 0, 0, 6, 0, 10, 0, 2, 0, 0 },
                          { 0, 0, 0, 16, 0, 2, 0, 1, 6 },
                          { 9, 11, 0, 0, 0, 0, 1, 0, 5 },
                          { 0, 0, 2, 0, 0, 0, 6, 5, 0 }
                            };

Graph.DijkstraAlgo(graph, 1, 9);