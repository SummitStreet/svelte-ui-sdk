<script lang="ts">
  /**
   * @license
   * The MIT License (MIT)
   *
   * Copyright (c) 2025 David Padgett/Summit Street Technologies.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   * @file
   * The +page module is a SvelteKit-specific component used to define a UI for
   * the only route of this single-page web-based app.
   */

  import type { NavigationBarContext, ProfileCardContext, SectionDescriptor } from "$lib";
  import { NavigableAction, NavigationBar, ProfileCard, Section } from "$lib";

  // NavigableAction demo state.
  let floatingVisible = $state(false);
  const toggleVisible = () => (floatingVisible = !floatingVisible);

  // NavigationBar demo data.
  const navContext: NavigationBarContext = {
    title: "Demo App",
    links: [
      { id: "nav-home", label: "Home", clickEventHandler: () => {} },
      { id: "nav-about", label: "About", clickEventHandler: () => {} },
      { id: "nav-contact", label: "Contact", clickEventHandler: () => {} },
    ],
  };

  // ProfileCard demo data.
  const profileContext: ProfileCardContext = {
    name: "Jane Smith",
    imageUrl: "https://placehold.co/100",
    description: "A software engineer with 10 years of experience building web applications.",
    links: [
      { id: "profile-linkedin", label: "LinkedIn", href: "https://linkedin.com", target: "_blank" },
      { id: "profile-email", label: "Email", clickEventHandler: () => alert("Email clicked") },
    ],
  };

  // Section demo data.
  const sectionData: SectionDescriptor = {
    id: "demo-root",
    sections: [
      {
        id: "demo-section",
        title: "Demo Section",
        description: "This is a demonstration of the Section component.",
        sections: [
          { id: "demo-child-1", title: "Child One", description: "First child section." },
          { id: "demo-child-2", title: "Child Two", description: "Second child section." },
          { id: "demo-child-3", title: "Child Three", description: "Third child section." },
        ],
      },
    ],
  };
</script>

<div class="demo">
  <h1>svelte-ui-sdk</h1>

  <div class="demo-component">
    <h2>NavigableAction</h2>
    <div class="demo-row">
      <NavigableAction id="demo-button" label="Button" title="Demo button" clickEventHandler={() => alert("clicked")} />
      <NavigableAction id="demo-link" label="Link" title="Demo link" href="https://example.com" target="_blank" />
      <NavigableAction id="demo-toggle" label="Toggle floating button" title="Toggle" clickEventHandler={toggleVisible} />
    </div>
    <p class="demo-note">The floating ↑ button (bottom-right) demonstrates the <code>visible</code> prop.</p>
  </div>

  <div class="demo-component">
    <h2>NavigationBar</h2>
    <NavigationBar id="demo-nav" context={navContext} />
  </div>

  <div class="demo-component">
    <h2>ProfileCard</h2>
    <ProfileCard id="demo-profile" context={profileContext} />
  </div>

  <div class="demo-component">
    <h2>Section</h2>
    <Section context={sectionData} />
  </div>
</div>

<NavigableAction id="demo-floating" className="demo-floating" label="↑" title="Floating button demo" visible={floatingVisible} clickEventHandler={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
