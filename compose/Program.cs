﻿using System;
using Microsoft.AspNetCore.Hosting;

namespace OmegaGraf.Compose
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine(Figgle.FiggleFonts.Standard.Render("OmegaGraf"));

            var host = new WebHostBuilder()
                       .UseKestrel()
                       .UseStartup<Startup>()
                       .Build();

            host.Run();
        }
    }
}